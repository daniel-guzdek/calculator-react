import { InitialDataType } from "../types/Types";
import { toPostfix } from "../utils/toPostfix";
import { evaluatePostfix } from "../utils/evaluatePostfix";
import { hasSpecialChars } from "../utils/hasSpecialChars";

export const handleSqrt = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  setData({
    ...data,
    error: null,
  });

  const expression = data.equation.join().replaceAll(",", "");

  try {
    const postfix = toPostfix(expression);
    const evaluatedResult = evaluatePostfix(postfix);

    if (evaluatedResult < 0 || !data.equation.length) {
      setData({ ...data, error: "Invalid input" });
      return;
    }

    const sqrtResult = Math.sqrt(
      hasSpecialChars(data.equation) ? data.result : evaluatedResult
    );

    const newEquation = [
      `√(${hasSpecialChars(data.equation) ? data.result : expression})`,
      "=",
      sqrtResult.toString(),
    ];

    setData({
      ...data,
      result: sqrtResult,
      equation: newEquation,
      lastChar: null,
    });
  } catch (error) {
    setData({ ...data, error: "Invalid input" });
  }
};
