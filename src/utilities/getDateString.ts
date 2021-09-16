const st = (day: number): boolean => {
  return day % 10 === 1 && day !== 11;
};
const nd = (day: number): boolean => {
  return day % 10 === 2 && day !== 12;
};
const rd = (day: number): boolean => {
  return day % 10 === 3 && day !== 13;
};

const postfix = (day: number): string => {
  if (st(day)) return day.toString() + "st";
  if (nd(day)) return day.toString() + "nd";
  if (rd(day)) return day.toString() + "rd";
  return day.toString() + "th";
};

export function getDateString(date: Date): string {
  const standardDateString = date.toDateString();
  const dateString =
    postfix(date.getDate()) +
    " " +
    standardDateString.slice(4, 7) +
    " " +
    standardDateString.slice(-4);
  return dateString;
}
