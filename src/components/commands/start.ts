import { TelegrafContext } from "telegraf/typings/context";
import findAccessLevel from "./findAccessLevel";

const message = `Hello! This is a multipurpose bot that can do a lot of things.
To view the full list of features use /help
To know about this bot use /info

If you donot have an access level of above 0, you may not be able to use this bot :(
Contact the admin if you don't know what to do
If you don't know the admin you're probably not supposed to interact with this bot`;

const startMessage = async (context: TelegrafContext) => {
  context.reply(message);
  findAccessLevel(context);
};

export default startMessage;
