import { VFC, memo, useEffect, useCallback } from "react";
import { Wrap, WrapItem, Spinner, Center, useDisclosure } from "@chakra-ui/react";

// import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
// import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
  }, [users, onSelectUser, onOpen]);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          {users.map(user => (
            <WrapItem>
            </WrapItem>
          ))}
        </Wrap>
      )}
      {/* <UserDetailModal user={selectUser} isOpen={isOpen} onClose={onClose} isAdmin={loginUser?.isAdmin ?? false} /> */}
    </>
  );
});