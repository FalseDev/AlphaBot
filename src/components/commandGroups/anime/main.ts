import { TelegrafContext } from "telegraf/typings/context";
import search from "./search";
import checkAccess from "../../common/adminAccess";
import findByID from "./findByID";
import * as inputProcessors from "./inputProcessors";
import animeHelpMessage from "./animeHelpMessage";

const animeCommandRouter = async (context: TelegrafContext) => {
  if (!checkAccess(context))
    return context.reply("Contact the admin to use this bot");
  const parts = context.message?.text?.split(" ")!;
  const command = parts?.splice(0, 2)[1];
  switch (command) {
    case "search":
      return context.reply(
        await search(inputProcessors.processSearchInput(parts))
      );
    case "id":
      const id = inputProcessors.processIDFindInput(parts);
      if (!id) return context.reply("Provide an id in the form of a number");
      return context.reply(await findByID(id));
    default:
      return context.reply(animeHelpMessage);
  }
};

export default animeCommandRouter;
