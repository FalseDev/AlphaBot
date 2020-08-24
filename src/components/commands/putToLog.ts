import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

const putToLog = (context: TelegrafContext) => {
  if (checkAccess(context) === 5) {
    console.log(context.message?.text?.slice(10));
    return context.reply("Logged to console");
  }
  context.reply("Only admins can use that command!");
};

export default putToLog