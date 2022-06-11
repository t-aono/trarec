import { VFC, memo, useEffect, useCallback, useState } from "react";
import { Wrap, WrapItem, Spinner, Center, useDisclosure, Flex } from "@chakra-ui/react";

import { useAllMenus } from "../../hooks/useAllMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuEditlModal } from "../organisms/menu/MenuEditlModal";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AddIcon } from "@chakra-ui/icons";
import { AddMenuButton } from "../atoms/button/AddMenuButton";

export const Setting: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMenus, loading, menus } = useAllMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

  const [isNew, setIsNew] = useState(false);

  useEffect(() => getMenus(), [getMenus]);

  const onClickMenu = useCallback(
    (id: string) => {
      setIsNew(false);
      onSelectMenu({ id, menus, onOpen });
    },
    [menus, onOpen, onSelectMenu]
  );

  const onClickAdd = useCallback(() => {
    setIsNew(true);
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Flex justify="center" mt={5}>
        <AddMenuButton onClick={onClickAdd} />
      </Flex>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          {menus.map((menu) => (
            <WrapItem key={menu.id}>
              <MenuCard menu={menu} onClick={onClickMenu} />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <MenuEditlModal
        menu={selectMenu}
        isOpen={isOpen}
        onClose={onClose}
        isNew={isNew}
        getMenus={getMenus}
      ></MenuEditlModal>
    </>
  );
});
