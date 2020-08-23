import { Telegraf } from "telegraf";

import * as count from "./components/commandGroups/count/main";
import joke from "./components/commands/joke";

import dotenv from "dotenv";
import * as mathFact from "./components/commandGroups/numberFact/main";
dotenv.config();

const bot = new Telegraf(<string>process.env.BOT_TOKEN);

bot.command("start", (context) => context.reply("Hoi"));

// Counting
bot.command("count", count.add);
bot.command("cancelcount", count.remove);
bot.command("countstatus", count.status);

// Numbers API
bot.command("datefact", mathFact.dateFact);
bot.command("mathfact", mathFact.numberFactMath);
bot.command("randomtrivia", mathFact.randomNumberTrivia);
bot.command("yearfact", mathFact.yearFact);
bot.command("numbertrivia", mathFact.numberTriviaFact);

bot.command("joke", joke);

console.log("Starting up!");
bot.launch();
