import { operators } from "../constants/operators";

export const containsOperator = (
  equation: (string | number | null)[]
): boolean => {
  return equation.some(
    (el) => typeof el === "string" && operators.includes(el)
  );
};
