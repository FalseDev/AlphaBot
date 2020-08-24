import dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";

// Import command groups
import * as count from "./components/commandGroups/count/main";
import * as mathFact from "./components/commandGroups/numberFact/main";

// Import commands
import joke from "./components/commands/joke";
import urbanDictionaryMeaning from "./components/commands/urbanDictionary";
import animeCommandRouter from "./components/commandGroups/anime/main";

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
bot.command("udef", urbanDictionaryMeaning);

bot.command("anime", animeCommandRouter);

console.log("Starting up!");
bot.launch();
