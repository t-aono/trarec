import { memo } from "react";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useMenus } from "../../../hooks/useMenus";
import { Menu } from "../../../types/menu";
import { AddIconButton } from "../../atoms/button/AddIconButton";

export const MenuCard = memo((props: { onClickMenu: (id: string) => void; onClickAdd: () => void }) => {
  const { onClickMenu, onClickAdd } = props;
  const { menus } = useMenus();

  const menuDetail = (menu: Menu) => {
    const weight = menu.weight ? `${menu.weight}${menu.weightType} / ` : "";
    const count = `${menu.count}回 × ${menu.set}セット`;
    return weight + count;
  };

  return (
    <>
      <Flex justify="center">
        <Box m={5} p={4} borderRadius="md" shadow="md" maxW="600px" flexGrow={1} marginBottom="120px">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <Box mb={4} key={menu.id}>
                <HStack spacing={5}>
                  <Text fontWeight="bold">{menu.name}</Text>
                  <EditIcon onClick={() => onClickMenu(menu.id)} />
                </HStack>
                <HStack>
                  <Text fontSize="sm">{menu.memo}</Text>
                </HStack>
                <HStack>
                  <Text fontSize="sm">{menuDetail(menu)}</Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Flex justify="center" align="center">
              <Text>メニューが未登録です。ボタンを押して追加してください。</Text>
            </Flex>
          )}
          <Flex justify="center" mt={5} mb={2}>
            <AddIconButton onClickAdd={onClickAdd} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
});
