import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { firebaseConfig } from "../firebase";

import { User } from "../types/user";

// type loginUserType = User & { isAdmin: boolean };

export type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
}

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  useEffect(() => {
    initializeApp(firebaseConfig);
    onAuthStateChanged(getAuth(), (userData) => {
      let user = null;
      if (userData) {
        user = { uid: userData.uid ? userData.uid : "", email: userData.email ? userData.email : "" };
      }
      console.log(user);
      setLoginUser(user);
    });
  }, []);

  const { children } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
}