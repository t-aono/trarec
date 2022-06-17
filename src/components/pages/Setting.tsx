import { memo, useEffect, useCallback } from "react";
import { useDisclosure, Box } from "@chakra-ui/react";

import { useMenus } from "../../hooks/useMenus";
import { MenuCard } from "../organisms/menu/MenuCard";
import { useSelectMenu } from "../../hooks/useSelectMenu";
import { MenuFormModal } from "../organisms/menu/MenuFormModal";
import { LoadingSpinner } from "../atoms/icon/LoadingSpinner";
import { BackHomeButton } from "../atoms/button/BackHomeButton";

export const Setting = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { listenMenus, loading, menus } = useMenus();
  const { onSelectMenu, selectMenu } = useSelectMenu();

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
  }, [onSelectMenu, menus, onOpen]);

  return (
    <>
      {loading ? <LoadingSpinner /> : <MenuCard menus={menus} onClickMenu={onClickMenu} onClickAdd={onClickAdd} />}
      <MenuFormModal menu={selectMenu} isOpen={isOpen} onClose={onClose}></MenuFormModal>
      <Box mb={5} ml={7}>
        <BackHomeButton />
      </Box>
    </>
  );
});
