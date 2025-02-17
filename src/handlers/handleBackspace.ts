import { InitialDataType } from "../types/Types";

export const handleBackspace = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => {
  setData({
    ...data,
    error: null,
  });

  const equation = [...data.equation];
  equation.length && equation.pop();

  return {
    ...data,
    equation,
    lastChar: equation.length ? equation[equation.length - 1] : null,
  };
};
