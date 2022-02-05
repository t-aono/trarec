import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

export const useFirebase = () => {
  initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
  });
  const db = getFirestore();
  return { db };
};
