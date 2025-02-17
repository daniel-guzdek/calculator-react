export const evaluatePostfix = (postfix: string[]): number => {
  const stack: number[] = [];

  postfix.forEach((token) => {
    if (/\d/.test(token) || token === "%") {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  });

  return stack[0];
};
