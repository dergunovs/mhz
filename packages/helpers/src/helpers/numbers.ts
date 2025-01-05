export function formatPercent(percent: number) {
  return percent === null ? '' : `${percent > 0 ? `+` : ``}${percent}%`;
}
