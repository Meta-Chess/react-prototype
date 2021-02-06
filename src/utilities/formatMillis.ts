export const formatMillis = (millis: number): { time: string; validFor: number } => {
  const sign = millis < 0 ? "-" : "";
  millis = Math.max(-millis, millis);
  const days = Math.floor(millis / 24 / 60 / 60 / 1000);
  const hours = Math.floor(millis / 60 / 60 / 1000) % 24;
  const minutes = Math.floor(millis / 60 / 1000) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const tenths = Math.floor(millis / 100) % 10;
  const hundredths = Math.floor(millis / 10) % 10;

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;
  const tenth = 100;
  const hundredth = 10;

  if (days > 2)
    return {
      time: sign + `${days} days`,
      validFor: day,
    };
  if (days > 0)
    return {
      time: sign + `${days} days ${hours} hours`,
      validFor: hour,
    };
  if (hours > 11)
    return {
      time: sign + `${hours} hours`,
      validFor: hour,
    };
  if (hours > 0)
    return {
      time: sign + `${hours} hours ${minutes} minutes`,
      validFor: minute,
    };
  if (minutes > 0)
    return {
      time: sign + `${minutes} minutes ${seconds.pad(2)} seconds`,
      validFor: second,
    };
  if (seconds > 9)
    return {
      time: sign + `${seconds} seconds`,
      validFor: second,
    };
  if (seconds > 2)
    return {
      time: sign + `${seconds}.${tenths} seconds`,
      validFor: tenth,
    };
  if (seconds <= 0)
    return {
      time: sign + `${seconds}.${tenths} seconds`,
      validFor: Number.POSITIVE_INFINITY,
    };
  return {
    time: sign + `${seconds}.${tenths}${hundredths} seconds`,
    validFor: hundredth,
  };
};

declare global {
  interface Number {
    pad: (length: number) => string;
  }
}

Number.prototype.pad = function (length: number): string {
  let s = String(this);
  while (s.length < length) s = "0" + s;
  return s;
};
