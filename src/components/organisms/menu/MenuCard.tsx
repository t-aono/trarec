import { memo } from "react";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import { AddMenuButton } from "../../atoms/button/AddMenuButton";
import { useMenus } from "../../../hooks/useMenus";

export const MenuCard = memo((props: { onClickMenu: (id: string) => void; onClickAdd: () => void }) => {
  const { onClickMenu, onClickAdd } = props;
  const { menus } = useMenus();

  return (
    <>
      {menus.length > 0 ? (
        <Flex justify="center">
          <Box m={5} p={4} borderRadius="md" shadow="md" maxW="600px" flexGrow={1}>
            {menus.map((menu) => (
              <Box mb={4} key={menu.id}>
                <HStack spacing={5}>
                  <Text fontWeight="bold">{menu.name}</Text>
                  <EditIcon onClick={() => onClickMenu(menu.id)} />
                </HStack>
                <HStack>
                  <Text fontSize="sm">{menu.memo}</Text>
                </HStack>
                <HStack>
                  {menu.weight && (
                    <Text fontSize="sm">
                      {menu.weight} {menu.weightType}：
                    </Text>
                  )}
                  <Text fontSize="sm">
                    {menu.count}回 × {menu.set}セット
                  </Text>
                </HStack>
              </Box>
            ))}
            <Flex justify="center" mt={5} mb={2}>
              <AddMenuButton onClick={onClickAdd} />
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Flex justify="center" align="center" h="70vh">
          <Text>メニューが未登録です。</Text>
        </Flex>
      )}
    </>
  );
});
