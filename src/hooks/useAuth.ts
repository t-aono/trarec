import axios from "axios";
import { useCallback, useState } from "react"
import { useHistory } from "react-router";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut } from "firebase/auth";

import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { firebaseConfig } from "../firebase";


export const useAuth = () => {
  initializeApp(firebaseConfig);
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const login = useCallback((mail: string, password: string) => {
    setLoading(true);

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            const userObject = userCredential.user;
            const uid = userObject.uid ? userObject.uid : "";
            const email = userObject.email ? userObject.email : "";
            setLoginUser({ uid, email });
            showMessage({ title: "ログインしました。", status: "info" });
            history.push("home");
          })
          .catch((error) => {
            console.log(error);
            console.log(error.code);
          });
      });
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setLoginUser(null);
      history.push("/");
      showMessage({ title: "ログアウトしました。", status: "info" });
    });
  }

  return { login, loading, logout }
}