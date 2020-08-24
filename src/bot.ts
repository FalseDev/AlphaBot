import dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";

// Import help and start command
import startMessage from "./components/commands/start"
import helpMessage from "./components/commands/help"
import infoMessage from "./components/commands/info"

// Import command sets
import * as count from "./components/commandGroups/count/main";
import * as mathFact from "./components/commandGroups/numberFact/main";

// Import commands
import joke from "./components/commands/joke";
import urbanDictionaryMeaning from "./components/commands/urbanDictionary";
import findId from "./components/commands/findId";
import findAccessLevel from "./components/commands/findAccessLevel";

// Import Admin commands
import putToLog from "./components/commands/putToLog";
import execCommand from "./components/commands/exec";

// Import command group routers
import animeCommandRouter from "./components/commandGroups/anime/main";

const bot = new Telegraf(<string>process.env.BOT_TOKEN);

bot.command("start", startMessage);
bot.command("help", helpMessage);
bot.command("info", infoMessage)

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

// Standalone commands
bot.command("joke", joke);
bot.command("udef", urbanDictionaryMeaning);

// Tool commands
bot.command("id", findId);
bot.command("myaccess", findAccessLevel);

// Command groups
bot.command("anime", animeCommandRouter);

// Admin commands
bot.command("puttolog", putToLog);
bot.command("exec", execCommand);

console.log("Starting up!");
bot.launch();
