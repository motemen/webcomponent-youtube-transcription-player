export function formatTime(t: number): string {
  const div = (x: number, y: number) => [Math.floor(x / y), x % y];
  const pad = (x: number) => (x < 10 ? '0' : '') + x;
  const [_secs, subsecs] = div(t, 1);
  const [_mins, secs] = div(_secs, 60);
  const [hours, mins] = div(_mins, 60);
  return `${hours}:${pad(mins)}:${pad(secs)}.${String(subsecs)
    .substring(2, 4)
    .padEnd(2, '0')}`;
}

export function decodeTime(s: string): number {
  const [hours, mins, secs] = s.split(':').map(x => parseFloat(x));
  return hours * 60 * 60 + mins * 60 + secs;
}
