
export const first = list => list[0];
export const last = list => list[list.length-1];
export const tap = (val, callback) => {
  callback(val);
  return val;
}