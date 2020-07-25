export const formatMillis = (millis: number) => {
  const sign = millis < 0 ? "-" : "";
  millis = Math.max(-millis, millis);
  const days = Math.floor(millis / 24 / 60 / 60 / 1000);
  const hours = Math.floor(millis / 60 / 60 / 1000) % 24;
  const minutes = Math.floor(millis / 60 / 1000) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const tenths = Math.floor(millis / 100) % 10;
  const hundredths = Math.floor(millis / 10) % 10;

  if (days > 2) return sign + `${days} days`;
  if (days > 0) return sign + `${days} days ${hours} hours`;
  if (hours > 11) return sign + `${hours} hours`;
  if (hours > 0) return sign + `${hours} hours ${minutes} minutes`;
  if (minutes > 0) return sign + `${minutes} minutes ${seconds.pad(2)} seconds`;
  if (seconds > 9) return sign + `${seconds} seconds`;
  if (seconds > 2) return sign + `${seconds}.${tenths} seconds`;
  return sign + `${seconds}.${tenths}${hundredths} seconds`;
};

declare global {
  interface Number {
    pad: (length: number) => string;
  }
}

Number.prototype.pad = function (length: number): string {
  var s = String(this);
  while (s.length < length) s = "0" + s;
  return s;
};
