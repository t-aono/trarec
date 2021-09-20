import { useCallback, useState } from "react";
import { collection, query, getDocs, orderBy } from "@firebase/firestore";

import { Menu } from "../types/menu";
import { useFirebase } from "./useFirebase";

export const useAllMenus = () => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<Array<Menu>>([]);
  const { db } = useFirebase();

  const getMenus = useCallback(() => {
    setLoading(true);
    let menus:Array<Menu> = [];
    getDocs(query(collection(db, "menus"), orderBy("name"))).then(snapshot => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        menus.push({ id: doc.id, name: data.name, count: data.count, set: data.set });
      });
      setMenus(menus);
    });
    setLoading(false);
  }, [db])

  return { getMenus, loading, menus, setMenus };
}