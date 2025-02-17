import { InitialDataType } from "../types/Types";
import { isOperator } from "../utils/isOperator";

export const handleComa = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  if (String(data.lastChar) === "." || isOperator(String(data.lastChar))) {
    return;
  }

  const newEquation = data.equation.length ? [...data.equation, "."] : [0, "."];

  setData({
    ...data,
    equation: newEquation,
    lastChar: ".",
  });
};
