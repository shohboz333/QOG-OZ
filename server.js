/**
 * QOG'OZ AI secure OpenAI proxy.
 * API key never reaches the browser.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6';
const ROOT = path.join(__dirname);

if (!OPENAI_API_KEY) {
  console.warn('[QOG\'OZ] OPENAI_API_KEY is not set. Static/local fallback still works, but QOG\'OZ AI will not call OpenAI.');
}

const mime = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.pdf':'application/pdf', '.txt':'text/plain; charset=utf-8'
};

function send(res, status, body, type='application/json; charset=utf-8') {
  res.writeHead(status, {'Content-Type': type, 'Cache-Control':'no-store'});
  res.end(body);
}

async function readBody(req) {
  let data='';
  for await (const chunk of req) {
    data += chunk;
    if (data.length > 64 * 1024) throw new Error('Request too large');
  }
  return JSON.parse(data || '{}');
}

const SYSTEM = `You are QOG'OZ AI, the official assistant inside QOG'OZ PDF Tools Pro.
Answer users in the same language they use, preferably clear Uzbek when they write Uzbek.
Your job is to help people use QOG'OZ, explain its PDF/image tools, troubleshoot simple issues, and recommend the right tool.
PROJECT FACTS:
- Project name: QOG'OZ PDF Tools Pro.
- Creator: Q.Shoxboz.
- Q.Shoxboz is the creator of this project. If asked who created QOG'OZ, say exactly that it was created by Q.Shoxboz.
- The product is designed to simplify everyday PDF and image work in the browser.
- Many file operations are performed locally in the browser; do not claim that every AI interaction is local.
- QOG'OZ AI requests can be routed through the project's secure server to OpenAI. Never ask the user to reveal an API key.
- Do not invent tools or capabilities that are not present in the supplied catalog.
- When a user asks how to do something, give short numbered steps and mention the relevant QOG'OZ tool by name.
- Be helpful, concise, friendly, and practical.
- Never claim to be Q.Shoxboz; you are the QOG'OZ AI assistant.`;

async function callOpenAI(body) {
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY missing');
  const model = typeof body.model === 'string' && /^[A-Za-z0-9._-]{1,80}$/.test(body.model) ? body.model : OPENAI_MODEL;
  const tools = typeof body.tools === 'string' ? body.tools.slice(0, 20000) : '';
  const creator = typeof body.creator === 'string' ? body.creator.slice(0, 100) : 'Q.Shoxboz';
  const userMessage = typeof body.message === 'string' ? body.message.slice(0, 8000) : '';
  if (!userMessage.trim()) throw new Error('Empty message');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_API_KEY}`},
    body:JSON.stringify({
      model,
      instructions: SYSTEM + `\nCreator field supplied by the app: ${creator}.\n\nAVAILABLE QOG'OZ TOOLS:\n${tools}`,
      input: userMessage,
      max_output_tokens: 700
    })
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`OpenAI ${response.status}: ${raw.slice(0,500)}`);
  const data = JSON.parse(raw);
  return data.output_text || (data.output || []).flatMap(x=>x.content||[]).map(x=>x.text||'').join('').trim();
}

async function route(req,res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/ai' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const answer = await callOpenAI(body);
      return send(res, 200, JSON.stringify({ok:true, answer}));
    } catch (e) {
      console.error('[QOG\'OZ AI]', e.message);
      return send(res, 503, JSON.stringify({ok:false, error:'AI xizmatiga ulanish imkoni bo‘lmadi.'}));
    }
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, JSON.stringify({error:'Method not allowed'}));
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.normalize(path.join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) return send(res, 403, JSON.stringify({error:'Forbidden'}));
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    const type = mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type':type});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
}

http.createServer((req,res)=>route(req,res).catch(err=>send(res,500,JSON.stringify({error:'Server error'})))).listen(PORT,HOST,()=>{
  console.log(`[QOG'OZ] http://${HOST}:${PORT}`);
});
