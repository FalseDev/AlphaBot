import { TelegrafContext } from "telegraf/typings/context";

class Counter {
  constructor({
    time,
    interval,
    name,
    context,
  }: {
    time: number;
    interval: number;
    name: string;
    context: TelegrafContext;
  }) {
    const timer = setInterval(() => {
      time -= interval;
      context.reply(`Timer: ${name}\nTime remaining: ${time}`);
    }, interval * 1000);

    const killtimer = setTimeout(() => {
      clearInterval(timer);
      context.reply(`Timer ${name} ended`);
    }, time * 1000);

    context.telegram.sendMessage(
      context.chat!.id,
      `Timer: ${time}\nInterval: ${interval}\nName: ${name}\nStatus: Running`
    );

    return { timer, killtimer, name, time, interval };
  }
}

const count = async (context: TelegrafContext) => {
  const comps = context.message!.text!.split(" ");

  let time = 60;
  let interval = 10;
  let name = "Unnamed timer";

  if (comps[1]) time = +comps[1];
  if (comps[2]) interval = +comps[2];
  if (comps[3]) name = comps[3];

  const timer = new Counter({ time, interval, name, context });
};

export default count;
