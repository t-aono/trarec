import { memo, useEffect, useCallback } from "react";
import { useDisclosure, Flex } from "@chakra-ui/react";

import { useMenus } from "../../hooks/useMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuFormModal } from "../organisms/menu/MenuFormModal";
import { AddMenuButton } from "../atoms/button/AddMenuButton";
import { LoadingSpinner } from "../atoms/icon/LoadingSpinner";

export const Setting = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listenMenus, loading, menus } = useMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

  // useEffect(() => getMenus(), [getMenus]);
  useEffect(() => listenMenus(), [listenMenus]);

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
      {loading ? <LoadingSpinner /> : <MenuCard menus={menus} onClickMenu={onClickMenu} />}
      <MenuFormModal menu={selectMenu} isOpen={isOpen} onClose={onClose}></MenuFormModal>
      <Flex justify="center" mt={5} mb={10}>
        <AddMenuButton onClick={onClickAdd} />
      </Flex>
    </>
  );
});
