import { initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { Firestore, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { ReactNode, createContext, useEffect } from "react";

initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID
});

export type FirebaseContextType = {
  auth: Auth;
  db: Firestore;
};

export const FirebaseContext = createContext<FirebaseContextType>({} as FirebaseContextType);

export const FirebaseProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (window.location.hostname === "localhost") {
      connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
      connectFirestoreEmulator(db, "localhost", 8080);
    }
  }, []);

  return <FirebaseContext.Provider value={{ auth, db }}>{children}</FirebaseContext.Provider>;
};
