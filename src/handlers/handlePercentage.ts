import { InitialDataType } from "../types/Types";
import { evaluatePostfix } from "../utils/evaluatePostfix";
import { toPostfix } from "../utils/toPostfix";

export const handlePercentage = (
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

  try {
    const expression = [...data.equation, value].join().replace(/\s+/g, "");
    const postfix = toPostfix(expression);
    const result = evaluatePostfix(postfix);

    setData((prevData) => {
      return {
        ...prevData,
        equation: [result.toString()],
        result,
      };
    });
  } catch (error) {
    setData((prevData) => ({
      ...prevData,
      equation: [],
      result: 0,
      error: "Invalid input",
    }));
  }
};
