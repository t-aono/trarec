import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";
import { collection, query, getDocs, orderBy, where, onSnapshot } from "@firebase/firestore";

import { Menu } from "../types/menu";
import { useLoginUser } from "../hooks/useLoginUser";
import { FirebaseContext } from "./FirebaseProvider";

export type MenusContextType = {
  menus: Menu[];
  setMenus: Dispatch<SetStateAction<Menu[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getMenus: () => void;
  listenMenus: () => void;
};

export const MenusContext = createContext<MenusContextType>({} as MenusContextType);

export const MenusProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { loginUser } = useLoginUser();

  const getMenus = useCallback(() => {
    console.log("getMenus!");
    setLoading(true);
    let menus: Menu[] = [];
    getDocs(query(collection(db, "menus"), orderBy("createdAt", "asc"), where("uid", "==", loginUser ? loginUser.uid : ""))).then((snapshot) => {
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
    setLoading(true);
    setMenus([]);
    onSnapshot(query(collection(db, "menus"), orderBy("createdAt", "asc"), where("uid", "==", loginUser ? loginUser.uid : "")), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === "added") {
          setMenus((menus) => [
            ...menus,
            {
              id: change.doc.id,
              name: data.name,
              memo: data.memo,
              weight: data.weight,
              weightType: data.weightType,
              count: data.count,
              set: data.set,
            },
          ]);
        } else if (change.type === "modified") {
          setMenus((menus) => {
            return menus.map((menu) =>
              menu.id === change.doc.id
                ? {
                    id: change.doc.id,
                    name: data.name,
                    memo: data.memo,
                    weight: data.weight,
                    weightType: data.weightType,
                    count: data.count,
                    set: data.set,
                  }
                : menu
            );
          });
        } else if (change.type === "removed") {
          setMenus((menus) => menus.filter((menu) => menu.id !== change.doc.id));
        }
      });
    });
    setLoading(false);
  }, [db, loginUser]);

  return <MenusContext.Provider value={{ menus, setMenus, loading, setLoading, getMenus, listenMenus }}>{children}</MenusContext.Provider>;
};
