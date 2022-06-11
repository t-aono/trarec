import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type MonthContextType = {
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
};

export const MonthContext = createContext<MonthContextType>({} as MonthContextType);

export const MonthProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const now = new Date();
  const [month, setMonth] = useState<string>(`${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}`);

  return <MonthContext.Provider value={{ month, setMonth }}>{children}</MonthContext.Provider>;
};
