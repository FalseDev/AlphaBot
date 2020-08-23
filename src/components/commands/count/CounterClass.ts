import { TelegrafContext } from "telegraf/typings/context";

export default class Counter {
  public timer:NodeJS.Timeout
  public killtimer:NodeJS.Timeout
  public name:string
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
    this.timer = timer
    this.killtimer = killtimer
    this.name = name
  }
}
