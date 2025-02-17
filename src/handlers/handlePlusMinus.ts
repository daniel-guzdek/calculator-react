import { InitialDataType } from "../types/Types";
import { toPostfix } from "../utils/toPostfix";
import { evaluatePostfix } from "../utils/evaluatePostfix";
import { isOperator } from "../utils/isOperator";

export const handlePlusMinus = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  setData((prevData) => ({
    ...prevData,
    error: null,
  }));

  if (!data.equation.length) {
    return setData((prevData) => ({
      ...prevData,
      equation: ["-"],
      lastChar: "-",
    }));
  }

  if (data.equation.length === 1 && data.lastChar === "-") {
    return setData((prevData) => ({
      ...prevData,
      equation: [],
      lastChar: null,
    }));
  }

  if (isOperator(String(data.lastChar))) {
    return;
  }

  const expression = data.equation.join().replaceAll(",", "");

  try {
    const postfix = toPostfix(expression);
    const evaluatedResult = evaluatePostfix(postfix);

    const plusMinusResult = -evaluatedResult;
    const newEquation = [`-(${expression})`];

    setData((prevData) => ({
      ...prevData,
      result: plusMinusResult,
      equation: newEquation,
      lastChar: null,
    }));
  } catch (error) {
    setData((prevData) => ({
      ...prevData,
      error: "Invalid input",
    }));
  }
};
