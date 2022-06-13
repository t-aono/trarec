import { memo, useEffect, useCallback } from "react";
import { useDisclosure, Flex } from "@chakra-ui/react";

import { useAllMenus } from "../../hooks/useAllMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuFormModal } from "../organisms/menu/MenuFormModal";
import { AddMenuButton } from "../atoms/button/AddMenuButton";
import { LoadingSpinner } from "../atoms/icon/LoadingSpinner";

export const Setting = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMenus, loading, menus } = useAllMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

  useEffect(() => getMenus(), []);

  const onClickMenu = useCallback(
    (id: string) => {
      onSelectMenu({ id, menus, onOpen });
    },
    [menus, onOpen, onSelectMenu]
  );

  const onClickAdd = useCallback(() => {
    onSelectMenu({ id: "", menus, onOpen });
    onOpen();
  }, []);

  return (
    <>
      <Flex justify="center" mt={5}>
        <AddMenuButton onClick={onClickAdd} />
      </Flex>
      {loading ? <LoadingSpinner /> : <MenuCard menus={menus} onClickMenu={onClickMenu} />}
      <MenuFormModal menu={selectMenu} isOpen={isOpen} onClose={onClose} getMenus={getMenus}></MenuFormModal>
    </>
  );
});
