import { getPrecedence } from "./getPrecedence";
import { isOperator } from "./isOperator";

export const toPostfix = (expression: string): string[] => {
  const output: string[] = [];
  const operators: string[] = [];
  // eslint-disable-next-line
  const tokens = expression.match(/(\d+\.?\d*|\%|[+\-*/()])/g) || [];

  tokens.forEach((token, index) => {
    if (/\d/.test(token) || token === "%") {
      output.push(token);
    } else if (isOperator(token)) {
      while (
        operators.length &&
        getPrecedence(operators[operators.length - 1]) >=
          getPrecedence(token) &&
        operators[operators.length - 1] !== "("
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop()!);
      }
      operators.pop();
    }

    // Handle negative numbers
    if (
      token === "-" &&
      (index === 0 ||
        tokens[index - 1] === "(" ||
        isOperator(tokens[index - 1]))
    ) {
      output.push("0");
    }
  });

  while (operators.length) {
    output.push(operators.pop()!);
  }

  return output;
};
