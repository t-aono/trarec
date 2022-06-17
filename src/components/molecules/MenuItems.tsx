import { useEffect } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { LoadingSpinner } from "../atoms/icon/LoadingSpinner";
import { Menu } from "../../types/menu";

export const MenuItems = (props: { loading: boolean; menus: Menu[]; getMenus: () => void }) => {
  // const { menus, loading, getMenus } = useMenus();
  const { loading, menus, getMenus } = props;

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
