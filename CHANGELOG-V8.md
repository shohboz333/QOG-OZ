# QOG'OZ V8 — QOG'OZ AI + OpenAI

## Removed
- `Savol-javob` / FAQ navigation and section removed completely.

## Kept
- `QOG'OZ AI` assistant remains the only in-product question/answer experience.

## OpenAI integration
- Added secure `/api/ai` backend proxy.
- Uses OpenAI Responses API.
- Default model: `gpt-5.6`.
- API key is read only from `OPENAI_API_KEY` environment variable.
- Browser never receives the OpenAI API key.
- QOG'OZ AI is instructed about the project, its tool catalog, purpose, and creator.
- If asked who created the project, the assistant identifies **Q.Shoxboz** as the creator.

## Deployment
- Added `server.js`, `package.json`, `.env.example`, `.gitignore`, and `OPENAI-SETUP.md`.
- Static file serving and `/api/ai` are handled by the same Node server.
- Local fallback remains available if the OpenAI backend is unavailable.
