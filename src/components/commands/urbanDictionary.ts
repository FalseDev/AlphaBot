import axios from "axios";
import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

const urbanDictionaryMeaning = async (context: TelegrafContext) => {
  if (!checkAccess(context))
    return context.reply("Contact the admin to use this bot");

  const word = context.message?.text?.split(" ")[1];
  if (!word) {
    return context.reply("No word provided");
  }
  const response = await axios({
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      term: word,
    },
  });
  if (response.data.list.length < 1)
    return context.reply(`No meaning found for ${word}`);
  const definition = response.data.list[0];
  context.reply(
    `Word: ${word}\n\nDefinition: ${definition.definition.slice(0, 2000)}${
      definition.definition.length > 2000 ? " [Trimmed to fit] " : ""
    }\n\nExample: ${definition.example.slice(0, 2000)}${
      definition.example.length > 2000 ? " [Trimmed to fit] " : ""
    }`
  );
};
export default urbanDictionaryMeaning;
