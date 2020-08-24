import { TelegrafContext } from "telegraf/typings/context";

const message = `This is the full list of all commands:
 - Anime:
    The anime related features are too many to be put here. If you're interested use /anime to know more
 - Number Facts:
   - /mathfact <number>
      To get a math fact about a number
   - /
   -
   -
   -

[ UNDER CONSTRUCTION ]
[ UNDER CONSTRUCTION ]
`;
const helpMessage = async (context: TelegrafContext) => {
  context.reply(message);
};

export default helpMessage;
