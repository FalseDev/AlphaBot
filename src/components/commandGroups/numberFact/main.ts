import axios from "axios";
import { TelegrafContext } from "telegraf/typings/context";

const getData = async (endpoint: string) => {
  return await axios({
    method: "GET",
    url: `https://numbersapi.p.rapidapi.com/${endpoint}`,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "numbersapi.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      fragment: "true",
      json: "true",
    },
  });
};

const getNumberInContext = (context: TelegrafContext) => {
  try {
    const number = +context.message?.text!.split(" ")[1]!;
    if (Number.isNaN(number)) {
      return false;
    }
    return number;
  } catch {
    return false;
  }
};

const validateDate = (fulldate: string) => {
  try {
    const comps = fulldate.split("/");
    const month = +comps[1];
    const date = +comps[0];
    if (Number.isNaN(month)) return "Month has to be a number";
    if (Number.isNaN(date)) return "Date has to be a number";
    if (month > 12 || month < 1) return "Invalid month";
    if (date > 31 || date < 1) return "Invalid date";
    return true;
  } catch {
    return false;
  }
};

export const numberFactMath = async (context: TelegrafContext) => {
  const number = getNumberInContext(context);
  if (!number) return context.reply("Invalid input");

  const response = await getData(`${number}/math`);
  if (!response.data.found)
    return context.reply("Not found for this number :(");
  context.reply(`Number: ${response.data.number}\n${response.data.text}`);
};

export const dateFact = async (context: TelegrafContext) => {
  const date = context.message?.text!.split(" ")[1];
  if (!date)
    return context.reply(
      "Invalid input,please provide a date in the dd/mm format"
    );
  const datePassed = validateDate(date);
  if (typeof datePassed === "string") return context.reply(datePassed);
  if (!datePassed) return context.reply("Invalid input");
  const response = await getData(`${date}/date`);
  if (!response.data.found) return context.reply("Not found for this date :(");
  context.reply(`Year: ${response.data.year}\n${response.data.text}`);
};

export const randomNumberTrivia = async (context: TelegrafContext) => {
  const response = await getData("random/trivia");
  context.reply(
    `Question: ${response.data.text}\n\nAnswer: ${response.data.number}`
  );
};

export const yearFact = async (context: TelegrafContext) => {
  const year = getNumberInContext(context);
  if (!year) return context.reply("Invalid input");

  const response = await getData(`${year}/year`);
  if (!response.data.found)
    return context.reply(`Sorry, nothing found for year ${year}`);
  context.reply(`Year: ${response.data.number}\n${response.data.text}`);
};

export const numberTriviaFact = async (context: TelegrafContext) => {
  const number = getNumberInContext(context);
  if (!number) return context.reply("Invalid input");

  const response = await getData(`${number}/trivia`);
  if (!response.data.found)
    return context.reply(`Sorry nothing found for number ${number}`);
  context.reply(
    `Question: ${response.data.text}\nAnswer: ${response.data.number}`
  );
};
