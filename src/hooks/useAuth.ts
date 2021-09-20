import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut } from "firebase/auth";

import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { useFirebase } from "./useFirebase";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const auth = getAuth();
  useFirebase();

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
          })
          .catch((error) => {
            console.log(error);
            console.log(error.code);
          });
      });
  }, [auth, setLoginUser, showMessage]);

  const logout = () => {
    signOut(auth).then(() => {
      setLoginUser(null);
      history.push("/");
      showMessage({ title: "ログアウトしました。", status: "info" });
    });
  }

  return { login, loading, logout }
}