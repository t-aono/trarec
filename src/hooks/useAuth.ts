import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut } from "firebase/auth";

import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { FirebaseContext } from "../providers/FirebaseProvider";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const { auth } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (mail: string, password: string) => {
      setLoading(true);

      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            const userObject = userCredential.user;
            const uid = userObject.uid ? userObject.uid : "";
            const email = userObject.email ? userObject.email : "";
            setLoginUser({ uid, email });
            showMessage({ title: "ログインしました。", status: "success" });
          })
          .catch((error) => {
            console.error(error.code, error);
            if (error.code === "auth/network-request-failed") {
              showMessage({ title: "ネットワーク接続に失敗しました。", status: "error" });
            }
            showMessage({ title: "ログインできませんでした。", status: "error" });
          })
          .finally(() => setLoading(false));
      });
    },
    [auth, setLoginUser, showMessage]
  );

  const signUp = useCallback(
    (mail: string, password: string) => {
      setLoading(true);

      setPersistence(auth, browserSessionPersistence).then(() => {
        createUserWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            const userObject = userCredential.user;
            const uid = userObject.uid ? userObject.uid : "";
            const email = userObject.email ? userObject.email : "";
            setLoginUser({ uid, email });
            showMessage({ title: "登録完了しました。", status: "success" });
          })
          .catch((error) => {
            if (error.code === "auth/internal-error") showMessage({ title: "メールアドレスが不正です。", status: "error" });
            else if (error.code === "auth/weak-password") showMessage({ title: "パスワードを長くして下さい。", status: "error" });
            else if (error.code === "auth/email-already-in-use") showMessage({ title: "登録済みメールアドレスです。", status: "error" });
            else console.error(error.code);
          })
          .then(() => setLoading(false));
      });
    },
    [auth, setLoginUser, showMessage]
  );

  const logout = () => {
    signOut(auth).then(() => {
      setLoginUser(null);
      history.push("/");
      showMessage({ title: "ログアウトしました。", status: "success" });
    });
  };

  return { login, loading, logout, signUp };
};
