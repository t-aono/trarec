import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  signOut,
  signInAnonymously,
} from "firebase/auth";

import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { useFirebase } from "./useFirebase";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  useFirebase();
  const auth = getAuth();

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
            console.log(error);
            showMessage({ title: "ログインできませんでした。", status: "error" });
          })
          .finally(() => setLoading(false));
      });
    },
    [auth, setLoginUser, showMessage]
  );

  const guestLogin = useCallback(() => {
    setLoading(true);

    setPersistence(auth, browserSessionPersistence).then(() => {
      signInAnonymously(auth)
        .then((userCredential) => {
          const userObject = userCredential.user;
          const uid = userObject.uid ? userObject.uid : "";
          const email = "";
          setLoginUser({ uid, email });
          showMessage({ title: "ゲストでログインしました。", status: "success" });
        })
        .catch((error) => {
          console.log(error);
          showMessage({ title: "ログインできませんでした。", status: "error" });
        });
    });
  }, [auth, setLoginUser, showMessage]);

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
            if (error.code === "auth/internal-error")
              showMessage({ title: "メールアドレスが不正です。", status: "error" });
            else if (error.code === "auth/weak-password")
              showMessage({ title: "パスワードを長くして下さい。", status: "error" });
            else if (error.code === "auth/email-already-in-use")
              showMessage({ title: "登録済みメールアドレスです。", status: "error" });
            else console.log(error.code);
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

  return { login, guestLogin, loading, logout, signUp };
};
