import { useCallback, useState } from "react";

import { User } from "../types/user";

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
}

export const useSelectUser = () => {
  const [selectUser, setSelectUser] = useState<User | null>();

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    // const targeteUser = users.find((user) => user.id === id);
    // setSelectUser(targeteUser!);
    onOpen();
  }, []);

  return { onSelectUser, selectUser };
}