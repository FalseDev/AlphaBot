import { Telegraf } from "telegraf";
import * as count from "./components/commands/count/main";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(<string>process.env.BOT_TOKEN);

bot.command("start", (context) => context.reply("Hoi"));

// Counting
bot.command("count", count.add);
bot.command("cancelcount", count.remove)

console.log("Starting up!");
bot.launch();
