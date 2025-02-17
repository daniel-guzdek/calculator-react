import { InitialDataType } from "../types/Types";
import { containsOperator } from "../utils/containsOperator";
import { isOperator } from "../utils/isOperator";
import { hasSpecialChars } from "../utils/hasSpecialChars";

export const handleDivide = (
  data: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>,
  value: string
) => {
  setData({
    ...data,
    error: null,
  });

  if (!data.equation.length) {
    return;
  }

  setData((prevData) => {
    if (isOperator(String(prevData.lastChar))) {
      return prevData;
    }

    let dividedEquation: (string | number | null)[];

    if (hasSpecialChars(prevData.equation)) {
      dividedEquation = containsOperator([prevData.result])
        ? ["(", prevData.result, ")", value]
        : [prevData.result, value];
    } else {
      dividedEquation = containsOperator(prevData.equation)
        ? ["(", ...prevData.equation, ")", value]
        : [...prevData.equation, value];
    }

    return {
      ...prevData,
      equation: dividedEquation,
      lastChar: value,
    };
  });
};
