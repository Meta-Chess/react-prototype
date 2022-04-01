export function getDaysBetweenDates(date: Date, pastDate: Date): number {
  return (date.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24);
}
