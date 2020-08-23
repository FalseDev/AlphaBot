import { TelegrafContext } from "telegraf/typings/context";
import prettyMillisecond from "pretty-ms";

function readable(seconds: number) {
  return prettyMillisecond(seconds * 1000, { verbose: true });
}

export default class Counter {
  public timer: NodeJS.Timeout;
  public killtimer: NodeJS.Timeout;
  public name: string;
  public getTime: () => string;
  constructor({
    time,
    interval,
    name,
    context,
    autoRemove,
  }: {
    time: number;
    interval: number;
    name: string;
    context: TelegrafContext;
    autoRemove: (name: string) => void;
  }) {
    const timer = setInterval(() => {
      time -= interval;
      context.reply(`Timer: ${name}\nTime remaining: ${readable(time)}`);
    }, interval * 1000);

    const killtimer = setTimeout(() => {
      clearInterval(timer);
      context.reply(`Timer ${name} ended`);
      autoRemove(name);
    }, time * 1000);

    context.telegram.sendMessage(
      context.chat!.id,
      `Timer: ${readable(
        time
      )}\nInterval: ${interval}\nName: ${name}\nStatus: Running`
    );
    this.timer = timer;
    this.killtimer = killtimer;
    this.name = name;
    this.getTime = () => `Timer ${name} at ${readable(time)}`;
  }
}
