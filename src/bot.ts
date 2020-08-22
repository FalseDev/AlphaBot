import { Telegraf } from "telegraf";
import count from "./components/count";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(<string>process.env.BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Hoi"));
bot.command("count", count);

console.log("Starting up!");
bot.launch();
