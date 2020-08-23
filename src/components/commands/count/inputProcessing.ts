function stringToSeconds(time: string) {
  try {
    let hrs = 0;
    let mins = 0;

    let comps = time.split(":");
    const secs = +comps.splice(comps.length - 1);
    if (comps) mins = +comps.splice(comps.length - 1);
    if (comps) hrs = +comps.splice(comps.length - 1);

    if (Number.isNaN(secs) || Number.isNaN(mins) || Number.isNaN(hrs))
      return "Invalid input";

    const inSeconds = hrs * 3600 + mins * 60 + secs;
    if (inSeconds < 1) return "Invalid input";
    return inSeconds;
  } catch {
    return "Invalid input";
  }
}
export const inputProcessor = ({
  time,
  interval,
}: {
  time: string;
  interval: string;
}) => ({ time: stringToSeconds(time), interval: stringToSeconds(interval) });
