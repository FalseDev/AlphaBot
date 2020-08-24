import axios from "axios";
import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

interface Joke {
  type: "twopart" | "single";
  joke?: string;
  setup?: string;
  delivery?: string;
}

interface JokesData {
  error: Boolean;
  jokes: Joke[];
  amount: number;
}

const joke = async (context: TelegrafContext) => {
  if (!checkAccess(context))
    return context.reply("Contact the admin to use this bot");
  const sendJoke = (joke: Joke) => {
    if (joke.type === "single") {
      return context.reply(joke.joke!);
    }
    context.reply(`${joke.setup!}\n\n${joke.delivery!}`);
  };

  let numberOfJokes = 1;
  const comps = context.message!.text!.split(" ");
  if (comps.length > 1) numberOfJokes = +comps[1];
  if (Number.isNaN(numberOfJokes) || numberOfJokes < 1)
    return context.reply("Please provide a proper number");

  const jokeResponse = await axios.get(
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist",
    { params: { amount: numberOfJokes }, data: "json" }
  );
  if (numberOfJokes > 1) {
    const jokeData = <JokesData>jokeResponse.data;
    const jokes = jokeData.jokes;

    jokes.map(sendJoke);
  } else {
    const joke = <Joke>jokeResponse.data;
    sendJoke(joke);
  }
  if (numberOfJokes > 10) {
    context.reply("Note: you can get only upto 10 jokes at once :)");
  }
};

export default joke;
