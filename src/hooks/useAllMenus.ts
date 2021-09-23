import { useCallback, useState } from "react";
import { collection, query, getDocs, orderBy, where } from "@firebase/firestore";

import { Menu } from "../types/menu";
import { useFirebase } from "./useFirebase";
import { useLoginUser } from "./useLoginUser";

export const useAllMenus = () => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<Array<Menu>>([]);
  const { db } = useFirebase();
  const { loginUser } = useLoginUser();

  const getMenus = useCallback(() => {
    setLoading(true);
    let menus: Array<Menu> = [];
    getDocs(query(collection(db, "menus"), orderBy("name"), where("uid", "==", loginUser ? loginUser.uid : '')))
      .then(snapshot => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          menus.push({ id: doc.id, name: data.name, count: data.count, set: data.set });
        });
        setMenus(menus);
      });
    setLoading(false);
  }, [db, loginUser])

  return { getMenus, loading, menus };
}