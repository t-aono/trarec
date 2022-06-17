import { useCallback, useState } from "react";

import { Menu } from "../types/menu";

type Props = {
  id: string;
  menus: Menu[];
  onOpen: () => void;
};

export const useSelectMenu = () => {
  const [selectMenu, setSelectMenu] = useState<Menu | null>();

  const onSelectMenu = useCallback((props: Props) => {
    const { id, menus, onOpen } = props;
    const targetMenu = menus.find((menu) => menu.id === id);
    setSelectMenu(targetMenu);
    onOpen();
  }, []);

  return { onSelectMenu, selectMenu };
};
