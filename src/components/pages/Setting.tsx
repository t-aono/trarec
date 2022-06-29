import { memo, useEffect, useCallback } from "react";
import { useDisclosure, Box, Divider } from "@chakra-ui/react";

import { useMenus } from "../../hooks/useMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuFormModal } from "../organisms/menu/MenuFormModal";
import { BottomLink } from "../molecules/BottomLink";

export const Setting = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listenMenus, menus } = useMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

  useEffect(() => listenMenus(), [listenMenus]);

  const onClickMenu = useCallback(
    (id: string) => {
      onSelectMenu({ id, menus, onOpen });
    },
    [onSelectMenu, menus, onOpen]
  );

  const onClickAdd = useCallback(() => {
    onSelectMenu({ id: "", menus, onOpen });
    onOpen();
  }, [onSelectMenu, menus, onOpen]);

  return (
    <>
      <MenuCard onClickMenu={onClickMenu} onClickAdd={onClickAdd} />
      <Box mt={5} mb={10}>
        <Divider mb={5} />
        <BottomLink />
      </Box>
      <MenuFormModal menu={selectMenu} isOpen={isOpen} onClose={onClose}></MenuFormModal>
    </>
  );
});
