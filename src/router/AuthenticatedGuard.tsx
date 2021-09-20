import { ReactNode, memo, VFC, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@chakra-ui/spinner';
import { Center } from '@chakra-ui/layout';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { useLoginUser } from '../hooks/useLoginUser';
import { useFirebase } from '../hooks/useFirebase';

export const AuthenticatedGuard: VFC<{ children: ReactNode }> = memo((props) => {
  const { children } = props;
  const { setLoginUser, loginUser } = useLoginUser();
  const [loading, setLoading] = useState(true);
  useFirebase();

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

  if (loading) return <Center h="100vh"><Spinner /></Center>
  else if (!loginUser) return <><Redirect to="/"/></>;
  return <>{ children }</>
});