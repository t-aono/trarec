import { useCallback, useState } from "react";
import { collection, query, getDocs, orderBy, startAt, endAt, where } from "@firebase/firestore";

import { useFirebase } from "./useFirebase";
import { History } from "../types/history";

export const useMonthHistories = () => {
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<Array<History>>([]);
  const { db } = useFirebase();

  const getHistories = useCallback((month: string) => {
    setLoading(true);
    let histories: Array<History> = [];
    const min = new Date(month);
    min.setDate(1);
    const next = new Date(month);
    const max = new Date(next.getFullYear(), next.getMonth() + 1, 0);
    getDocs(query(collection(db, "histories"), orderBy("date", "desc"), startAt(max), endAt(min)))
      .then(snapshot => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.date.toDate();
          histories.push({
            id: doc.id,
            date: `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`,
            menuId: data.menuId,
            count: data.count,
            set: data.set
          });
        });
        setHistories(histories);
      });
    setLoading(false);
  }, [db])

  return { getHistories, loading, histories };
}