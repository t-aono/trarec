import { useEffect } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { LoadingSpinner } from "../atoms/icon/LoadingSpinner";
import { useMenus } from "../../hooks/useMenus";

export const MenuItems = () => {
  const { loading, menus, getMenus } = useMenus();

  useEffect(() => getMenus(), [getMenus]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <UnorderedList spacing={3}>
          {menus &&
            menus.map((menu) => (
              <ListItem key={menu.id} fontSize="sm">
                {menu.name}：{menu.count}回 × {menu.set}セット
              </ListItem>
            ))}
        </UnorderedList>
      )}
    </>
  );
};
