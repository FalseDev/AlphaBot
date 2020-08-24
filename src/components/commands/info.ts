import { TelegrafContext } from "telegraf/typings/context";

const message = `Under construction, please wait :)`;

const infoMessage = async (context: TelegrafContext) => {
  context.reply(message);
};

export default infoMessage;
