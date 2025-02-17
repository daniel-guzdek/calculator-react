import { InitialDataType } from "../types/Types";
import { toPostfix } from "../utils/toPostfix";
import { evaluatePostfix } from "../utils/evaluatePostfix";
import { isOperator } from "../utils/isOperator";

export const handleEqual = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  setData({
    ...data,
    error: null,
  });

  if (isOperator(String(data.lastChar))) {
    return;
  }

  try {
    const expression = data.equation.join("").replaceAll(",", "");
    const postfix = toPostfix(expression);
    const evaluatedResult = evaluatePostfix(postfix);

    setData((prevData) => ({
      ...prevData,
      equation: [evaluatedResult],
      result: evaluatedResult,
      lastChar: "=",
    }));
  } catch (error) {
    setData({
      ...data,
      equation: [],
      result: 0,
      error: "Invalid input",
    });
  }
};
