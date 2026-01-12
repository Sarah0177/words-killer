export const isKilled = (needKillTimes: number, killTimes:number): boolean => {
  return Number(needKillTimes) <= Number(killTimes);
};