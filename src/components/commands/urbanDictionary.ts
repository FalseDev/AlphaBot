import axios from "axios";
import { TelegrafContext } from "telegraf/typings/context";

const urbanDictionaryMeaning = async (context: TelegrafContext) => {
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
      "x-rapidapi-key": "10f53bdb2cmsh87a4ee612b23be4p16c682jsn83e255ce952b",
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
    `Word: ${word}\n\nDefinition: ${definition.definition}\n\nExample: ${definition.example}`
  );
};
export default urbanDictionaryMeaning;
