import { memo, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { useMenus } from "../../hooks/useMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuFormModal } from "../organisms/menu/MenuFormModal";
import Footer from "../organisms/layout/Footer";

export const Setting = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMenus, menus } = useMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

  useEffect(() => {
    getMenus();
  }, []);

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
      <MenuFormModal menu={selectMenu} isOpen={isOpen} onClose={onClose}></MenuFormModal>
      <Footer />
    </>
  );
});
