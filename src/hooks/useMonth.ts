import { useContext } from "react";
import { MonthContext, MonthContextType } from "../providers/MonthProvider";

export const useMonth = (): MonthContextType => useContext(MonthContext);
