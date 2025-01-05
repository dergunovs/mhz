export function dataTest(value: string) {
  return `[data-test="${value}"]`;
}

export async function wait(time?: number) {
  await new Promise((r) => {
    setTimeout(r, time || 10);
  });
}
