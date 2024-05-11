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
    let menuList: Menu[] = [];
    onSnapshot(
      query(collection(db, "menus"), orderBy("createdAt", "asc"), where("uid", "==", loginUser ? loginUser.uid : "")),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const index = menuList.findIndex((menu) => menu.id === change.doc.id);
          const data = change.doc.data();
          if (change.type === "added") {
            menuList.push({
              id: change.doc.id,
              name: data.name,
              memo: data.memo,
              weight: data.weight,
              weightType: data.weightType,
              count: data.count,
              set: data.set,
            });
          } else if (change.type === "modified") {
            setMenus(
              menuList.splice(index, 1, {
                id: change.doc.id,
                name: data.name,
                memo: data.memo,
                weight: data.weight,
                weightType: data.weightType,
                count: data.count,
                set: data.set,
              })
            );
          } else if (change.type === "removed") {
            setMenus(menuList.splice(index, 1));
          }
        });
        setMenus(menuList);
      }
    );
    setLoading(false);
  }, [db, loginUser]);

  return (
    <MenusContext.Provider value={{ menus, setMenus, loading, setLoading, getMenus, listenMenus }}>
      {children}
    </MenusContext.Provider>
  );
};
