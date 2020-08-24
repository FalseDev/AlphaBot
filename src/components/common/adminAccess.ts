import { TelegrafContext } from "telegraf/typings/context";

const ADMINS = JSON.parse(process.env.ADMINS!);
const ALLOWED_GROUPS = JSON.parse(process.env.ALLOWED_GROUPS!);

const checkAccess = (context: TelegrafContext) => {
  if (ADMINS.find((admin: number) => context.message?.from?.id === admin))
    return 5;
  if (
    ALLOWED_GROUPS.find((group: number) => context.message?.chat.id === group)
  )
    return 1;
  return 0;
};

export default checkAccess;
