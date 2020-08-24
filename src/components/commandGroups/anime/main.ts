import { TelegrafContext } from "telegraf/typings/context";
import search from "./search";
import checkAccess from "../../common/adminAccess";

const animeCommandRouter = async (context: TelegrafContext) => {
  if (!checkAccess(context))
    return context.reply("Contact the admin to use this bot");
  const parts = context.message?.text?.split(" ")!;
  const command = parts?.splice(0, 2)[1];
  switch (command) {
    case "search":
      return context.reply(await search(processSearchInput(parts)));
    default:
      return context.reply(help());
  }
};

const help = () => {
  return "Anime help message coming soon...\n\ud83d\ude09";
};

const processSearchInput = (parts: string[]) => {
  let perPage = +parts[parts.length - 2];
  let page = +parts[parts.length - 1];
  let control = 2; // Number of parts that don't belong to the search term

  if (Number.isNaN(page)) {
    control--;
    page = 1;
  }
  if (Number.isNaN(perPage)) {
    control--;
    perPage = 5;
  }
  const searchTerm = parts.slice(0, parts.length - control).join(" ");

  return { searchTerm, page, perPage };
};

export default animeCommandRouter;
