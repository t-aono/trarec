import { ReactNode, memo, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import { useLoginUser } from "../hooks/useLoginUser";

export const AuthenticatedGuard = memo((props: { children: ReactNode }) => {
  const { children } = props;
  const { setLoginUser, loginUser } = useLoginUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (userData) => {
      let user = null;
      if (userData) {
        user = { uid: userData.uid ? userData.uid : "", email: userData.email ? userData.email : "" };
        setLoginUser(user);
      }
      setLoading(false);
    });
  }, [setLoginUser]);

  if (loading)
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  else if (!loginUser)
    return (
      <>
        <Redirect to="/" />
      </>
    );
  return <>{children}</>;
});
