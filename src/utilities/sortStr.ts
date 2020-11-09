export function sortStr(t1: string, t2: string): number {
  if (t1 > t2) return 1;
  else if (t1 < t2) return -1;
  else return 0;
}
