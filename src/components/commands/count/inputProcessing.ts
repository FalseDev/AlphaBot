function stringToSeconds(time: string) {
  try {
    const h = time.split("h");
    const hrs = +h[0];
    const m = h[1].split("m");
    const mins = +m[0];
    const s = m[1].split("s");
    const secs = +s[0];
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
