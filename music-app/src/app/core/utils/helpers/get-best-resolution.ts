export function getBest(data: any) {
  const best = data[data.length - 1]
  return best ? best : '';
}
