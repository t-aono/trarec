import { useCallback, useState } from "react";
import { collection, query, getDocs, orderBy, where } from "@firebase/firestore";

import { Menu } from "../types/menu";
import { useFirebase } from "./useFirebase";
import { useLoginUser } from "./useLoginUser";

export const useAllMenus = () => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<Menu[]>([]);
  const { db } = useFirebase();
  const { loginUser } = useLoginUser();

  const getMenus = useCallback(() => {
    setLoading(true);
    let menus: Menu[] = [];
    getDocs(
      query(collection(db, "menus"), orderBy("createdAt", "asc"), where("uid", "==", loginUser ? loginUser.uid : ""))
    ).then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        menus.push({
          id: doc.id,
          name: data.name,
          memo: data.memo,
          weight: data.weight,
          weightType: data.weightType,
          count: data.count,
          set: data.set,
        });
      });
      setMenus(menus);
    });
    setLoading(false);
  }, [db, loginUser]);

  return { getMenus, loading, menus };
};
