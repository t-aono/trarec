import { useEffect } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useMenus } from "../../hooks/useMenus";
import { History } from "../../types/history";
import { Menu } from "../../types/menu";

export const MenuItems = (props: { history: History | null }) => {
  const { menus, getMenus } = useMenus();

  useEffect(() => getMenus(), [getMenus]);

  let historyMenus: Menu[] = [];
  if (props.history) historyMenus = props.history!.menus;
  else historyMenus = menus;

  return (
    <UnorderedList spacing={3}>
      {historyMenus &&
        historyMenus.map((menu) => (
          <ListItem key={menu.id} fontSize="sm">
            {menu.name}：{menu.count}回 × {menu.set}セット
          </ListItem>
        ))}
    </UnorderedList>
  );
};
