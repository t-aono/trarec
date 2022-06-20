import { useContext } from "react";
import { HistoriesContext, HistoriesContextType } from "../providers/HistoriesProvider";

export const useHistories = (): HistoriesContextType => useContext(HistoriesContext);
