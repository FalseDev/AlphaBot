import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

const findId = (context: TelegrafContext) => {
  if (!(process.env.SETUP_MODE === "true")) {
    if (!checkAccess(context))
      return context.reply("Contact the admin to use this bot");
  }

  context.reply(
    `Chat ID: ${context.chat?.id}\nUser ID: ${context.message?.from?.id}`
    );
    console.log(`Chat ID: ${context.chat?.id}\nUser ID: ${context.message?.from?.id}`)
};

export default findId;
