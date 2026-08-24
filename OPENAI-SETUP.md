# QOG'OZ AI — OpenAI ulash

QOG'OZ AI OpenAI Responses API orqali ishlashi uchun loyiha ichida xavfsiz server proxy bor.

## 1. API keyni serverda saqlang

`.env.example` nusxasini `.env` qiling va `OPENAI_API_KEY` ni kiriting.

**API keyni `index.html`, `js/config.js`, GitHub yoki boshqa client-side faylga yozmang.** OpenAI API keyni browserga joylashtirmaslikni tavsiya qiladi; so'rovlarni o'z backend serveringiz orqali yuborish kerak.

## 2. Ishga tushirish

Node.js 18+ kerak.

```bash
# Windows PowerShell
$env:OPENAI_API_KEY="sk-..."
$env:OPENAI_MODEL="gpt-5.6"
node server.js
```

Yoki `.env` qiymatlarini hosting platformangizning Environment Variables qismiga kiriting.

Keyin `http://localhost:3000` ni oching.

## 3. QOG'OZ AI uchun loyiha konteksti

Server QOG'OZ AI ga doim quyidagi asosiy ma'lumotlarni beradi:

- Loyiha: QOG'OZ PDF Tools Pro
- Muallif: **Q.Shoxboz**
- Maqsad: odamlarning PDF va rasm bilan ishlashini osonlashtirish
- Mavjud tool katalogi
- AI QOG'OZ yordamchisi ekanligi

Agar foydalanuvchi “Bu loyihani kim yaratgan?” deb so'rasa, AI: **“QOG'OZ loyihasi Q.Shoxboz tomonidan yaratilgan.”** deb javob beradi.

## 4. Muhim xavfsizlik

API key foydalanuvchi brauzeriga yuborilmaydi. `server.js` keyni `OPENAI_API_KEY` environment variable'dan oladi.

Productionda HTTPS, rate limiting, authentication/admin controls va monitoring qo'shish tavsiya etiladi.
