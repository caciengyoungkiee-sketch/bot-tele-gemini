const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

bot.start((ctx) => ctx.reply('Bot Gemini sudah aktif di Railway!'));

bot.on('text', async (ctx) => {
  try {
    const result = await model.generateContent(ctx.message.text);
    const response = await result.response;
    await ctx.reply(response.text());
  } catch (err) {
    console.error(err);
    ctx.reply('Maaf, ada gangguan teknis.');
  }
});

bot.launch();
