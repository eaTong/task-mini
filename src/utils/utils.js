/**
 * Created by eaTong on 2018/10/3 .
 * Description:
 */


export function getDateDiff(a, b) {
  if (!(a instanceof Date)) {
    a = new Date(a);
  }
  a.setHours(0);
  a.setMinutes(0);
  a.setSeconds(0);
  a.setMilliseconds(0);
  if (!(b instanceof Date)) {
    b = new Date(b);
  }
  b.setHours(0);
  b.setMinutes(0);
  b.setSeconds(0);
  b.setMilliseconds(0);
  const diff = a.getTime() / 1000 - b.getTime() / 1000;
  return diff / (60 * 60 * 24);
}

export function daysFromToday(date) {
  return getDateDiff(date, new Date());
}


