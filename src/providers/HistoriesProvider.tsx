import { createContext, ReactNode, useCallback, useState, SetStateAction, Dispatch } from "react";
import { collection, query, getDocs, orderBy, startAt, endAt, where } from "@firebase/firestore";

import { useFirebase } from "../hooks/useFirebase";
import { useLoginUser } from "../hooks/useLoginUser";
import { History } from "../types/history";

export type HistoriesContextType = {
  histories: History[];
  setHistories: Dispatch<SetStateAction<History[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getHistories: (month: string) => void;
};

export const HistoriesContext = createContext<HistoriesContextType>({} as HistoriesContextType);

export const HistoriesProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<History[]>([]);
  const { db } = useFirebase();
  const { loginUser } = useLoginUser();

  const getHistories = useCallback(
    (month: string) => {
      console.log("getHistories!");
      setLoading(true);
      let histories: History[] = [];
      const min = new Date(month);
      min.setDate(1);
      const next = new Date(month);
      const max = new Date(next.getFullYear(), next.getMonth() + 1, 0);
      getDocs(
        query(
          collection(db, "histories"),
          orderBy("date"),
          startAt(min),
          endAt(max),
          where("uid", "==", loginUser ? loginUser.uid : "")
        )
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.date.toDate();
          histories.push({
            id: doc.id,
            date: date.getDate(),
            day: date.getDay(),
            menus: data.menus,
          });
        });
        setHistories(histories);
      });
      setLoading(false);
    },
    [db, loginUser]
  );

  return (
    <HistoriesContext.Provider value={{ histories, setHistories, loading, setLoading, getHistories }}>
      {children}
    </HistoriesContext.Provider>
  );
};
