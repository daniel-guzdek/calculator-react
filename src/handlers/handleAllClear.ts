import { InitialDataType } from "../types/Types";

export const handleAllClear = (
  initialData: InitialDataType,
  setData: React.Dispatch<React.SetStateAction<InitialDataType>>
) => setData(initialData);
