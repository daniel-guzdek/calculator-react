import { InitialDataType } from "../types/Types";
import { hasSpecialChars } from "../utils/hasSpecialChars";

export const handleNumber = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>,
  value: number
) => {
  setData({
    ...data,
    error: null,
  });

  setData((prevData) => {
    const newEquation = hasSpecialChars(prevData.equation)
      ? [value]
      : [...prevData.equation, value];

    return {
      ...prevData,
      equation: newEquation,
      lastChar: value,
      result: parseFloat(newEquation.join("")) || 0,
    };
  });
};
