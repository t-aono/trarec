import { ReactNode, memo, VFC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useLoginUser } from '../hooks/useLoginUser';

export const AuthenticatedGuard: VFC<{ children: ReactNode }> = memo((props) => {
  const { children } = props;
  const location = useLocation();
  const { loginUser } = useLoginUser();
  const history = useHistory();

  if (!loginUser) history.push('/');
  return <>{ children }</>
});