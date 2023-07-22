export function html(strings: TemplateStringsArray, ...expressions: unknown[]) {
  let result = '';

  expressions.forEach((expression, index) => {
    result += `${strings[index]}${expression}`;
  });

  result += strings.at(-1);

  return result;
}
