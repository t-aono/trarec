import { memo, useEffect, useState } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useMenus } from "../../hooks/useMenus";
import { History } from "../../types/history";
import { Menu } from "../../types/menu";

export const MenuItems = memo((props: { history: History | null }) => {
  const { menus } = useMenus();
  const [historyMenus, setHistoryMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (props.history) setHistoryMenus(props.history!.menus);
    else setHistoryMenus(menus);
  }, [props, menus]);

  const menuDetail = (menu: Menu) => {
    const weight = menu.weight ? `${menu.weight}${menu.weightType} / ` : "";
    const count = `${menu.count}回 × ${menu.set}セット`;
    return weight + count;
  };

  return (
    <UnorderedList spacing={3}>
      {historyMenus &&
        historyMenus.map((menu) => (
          <ListItem key={menu.id} fontSize="sm" whiteSpace="pre-line">
            {menu.name + "\n" + menuDetail(menu)}
          </ListItem>
        ))}
    </UnorderedList>
  );
});
