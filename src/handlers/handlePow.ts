import { InitialDataType } from "../types/Types";
import { isOperator } from "../utils/isOperator";

export const handlePow = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>,
  value: number
) => {
  setData({
    ...data,
    error: null,
  });

  if (isOperator(String(data.lastChar))) {
    return;
  }

  const powResult = Math.pow(data.result, value);
  const newEquation = data.equation.length
    ? [`(${data.equation})`, `^${value}`]
    : [`(${data.result})`, `^${value}`];

  setData({
    ...data,
    result: powResult,
    equation: newEquation,
    lastChar: null,
  });
};
