import { VFC, memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDisclosure, Flex, Heading, Link, Box } from "@chakra-ui/react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { LinkDrawer } from "../../molecules/LinkDrawer";
import { useAuth } from "../../../hooks/useAuth";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { logout } = useAuth();

  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickSetting = useCallback(() => history.push("/home/setting"), [history]);
  const onClickLogout = useCallback(() => logout(), [logout]);

  return (
    <>
      <Flex as="nav" bg="cyan.400" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }} onClick={onClickHome}>
            Training Histroy
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
          <Box ml="auto" px={4}>
            <Link fontSize="sm" onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <LinkDrawer onClose={onClose} isOpen={isOpen} 
        onClickHome={onClickHome} onClickSetting={onClickSetting} onClickLogout={onClickLogout}
      />
    </>
  );
});