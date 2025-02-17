import { InitialDataType } from "../types/Types";

export const handleReciprocal = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  setData({
    ...data,
    error: null,
  });

  if (data.result === 0) {
    setData({ ...data, error: "Cannot divide by zero" });
    return;
  }

  const reciprocal = 1 / data.result;
  const newEquation = ["1", "/", data.result.toString()];

  setData({
    ...data,
    result: reciprocal,
    equation: newEquation,
    lastChar: null,
  });
};
