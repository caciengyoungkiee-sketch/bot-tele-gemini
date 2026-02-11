const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inisialisasi Bot dan AI
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Pesan saat bot dimulai
bot.start((ctx) => ctx.reply('Bot Gemini sudah aktif di Railway! Ada yang bisa dibantu?'));

// Logika menjawab pesan
bot.on('text', async (ctx) => {
  try {
    // Memberi tanda bot sedang mengetik
    await ctx.sendChatAction('typing');
    
    const result = await model.generateContent(ctx.message.text);
    const response = await result.response;
    const text = response.text();
    
    await ctx.reply(text);
  } catch (err) {
    console.error('Error Gemini:', err);
    await ctx.reply('Maaf, otakku lagi panas. Coba tanya lagi nanti ya!');
  }
});

// Menjalankan Bot
bot.launch().then(() => {
  console.log("Bot berhasil meluncur!");
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
