import { useCallback, useState } from "react";
import { collection, query, getDocs, orderBy, where, onSnapshot } from "@firebase/firestore";

import { Menu } from "../types/menu";
import { useFirebase } from "./useFirebase";
import { useLoginUser } from "./useLoginUser";

export const useMenus = () => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<Menu[]>([]);
  const { db } = useFirebase();
  const { loginUser } = useLoginUser();
  let unsubscribe = null;

  const getMenus = useCallback(() => {
    console.log("getMenus!");
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

  const listenMenus = useCallback(() => {
    console.log("listenMenus!");
    setLoading(true);
    let newMenus: Menu[] = [];
    onSnapshot(
      query(collection(db, "menus"), orderBy("createdAt", "asc"), where("uid", "==", loginUser ? loginUser.uid : "")),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.type);
          const data = change.doc.data();
          if (change.type === "added") {
            newMenus.push({
              id: change.doc.id,
              name: data.name,
              memo: data.memo,
              weight: data.weight,
              weightType: data.weightType,
              count: data.count,
              set: data.set,
            });
          } else if (change.type === "modified") {
          }
        });
        setMenus(newMenus);
      }
    );
    setLoading(false);
  }, [db, loginUser]);

  return { getMenus, listenMenus, loading, menus };
};
