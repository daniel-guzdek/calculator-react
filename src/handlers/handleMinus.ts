import { InitialDataType } from "../types/Types";
import { isOperator } from "../utils/isOperator";
import { hasSpecialChars } from "../utils/hasSpecialChars";

export const handleMinus = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>,
  value: string
) => {
  setData({
    ...data,
    error: null,
  });

  setData((prevData) => {
    if (isOperator(String(prevData.lastChar))) {
      return prevData;
    }

    const newEquation = hasSpecialChars(prevData.equation)
      ? [prevData.result, value]
      : [...prevData.equation, value];

    return {
      ...prevData,
      equation: newEquation,
      lastChar: value,
    };
  });
};
