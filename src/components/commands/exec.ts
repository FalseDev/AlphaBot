import { exec } from "child_process";
import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

const execCommand = async(context: TelegrafContext) => {
  if (!(checkAccess(context) === 5))
    return context.reply("That's an admin only command!");

  const command = context.message?.text?.slice(6);

  let output = `Command: ${command}\n\n`;

  exec(command!, (error, stdout, stderr) => {
    if (error) {
      output += `error:\n${error.message}\n\n`;
      return;
    }
    if (stderr) {
      output += `stderr:\n${stderr}\n\n`;
      return;
    }
    output += `stdout:\n${stdout}`;
    context.reply(output);
  });

};

export default execCommand;
