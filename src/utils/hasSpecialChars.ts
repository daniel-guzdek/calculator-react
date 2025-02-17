import { specialChars } from "../constants/specialChars";

export const hasSpecialChars = (
  equation: (string | number | null)[]
): boolean => equation.some((char) => specialChars.includes(char as string));
