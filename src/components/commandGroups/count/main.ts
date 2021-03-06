import { TelegrafContext } from "telegraf/typings/context";
import { inputProcessor } from "./inputProcessing";
import Counter from "./CounterClass";

const timers = <Counter[]>[];

export const add = async (context: TelegrafContext) => {
  const comps = context.message!.text!.split(" ");

  let { time, interval } = inputProcessor({
    time: comps[1],
    interval: comps[2],
  });

  if (typeof time === "number" && typeof interval === "number") {
    let name = "Unnamed timer";
    if (comps[3]) name = comps[3];

    if (timers.find((timer) => timer.name === name))
      return context.reply(`Another timer already running with name ${name}`);

    const newTimer = new Counter({ time, interval, name, context, autoRemove });
    timers.push(newTimer);
  } else {
    context.reply("Sorry, invalid options");
  }
};

export const remove = (context: TelegrafContext) => {
  const name = context.message?.text!.slice(13);
  const targetIndex = timers.findIndex((timer) => name === timer.name);
  if (targetIndex === -1) {
    return context.reply(`No timer with name ${name}`);
  }
  const target = timers.splice(targetIndex, 1)[0];
  clearTimeout(target?.killtimer!);
  clearInterval(target?.timer!);
  context.reply(`Timer ${name} stopped`);
};

export const status = (context: TelegrafContext) => {
  if (timers.length > 0) {
    const timerStatus = timers.map((timer) => timer.getTime()).join("\n");
    context.reply(`Timers:\n${timerStatus}`);
  } else {
    context.reply("No active timers");
  }
};

const autoRemove = (timerToBeRemoved: string) => {
  const indexToBeRemoved = timers.findIndex(
    (timer) => timer.name === timerToBeRemoved
  );
  timers.splice(indexToBeRemoved);
};
