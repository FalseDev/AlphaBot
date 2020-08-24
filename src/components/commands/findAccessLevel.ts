import { TelegrafContext } from "telegraf/typings/context";
import checkAccess from "../common/adminAccess";

const findAccessLevel = (context: TelegrafContext) => {
  context.reply(
    `Current chat's access level: ${checkAccess(
      context
    )}\nLevel 0: No access\nLevel 1: Access to common features\nLevel 5: Admin`
  );
};

export default findAccessLevel;
