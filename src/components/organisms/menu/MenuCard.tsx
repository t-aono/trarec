import { memo } from "react";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";

import { Menu } from "../../../types/menu";
import { EditIcon } from "@chakra-ui/icons";

export const MenuCard = memo((props: { menus: Menu[]; onClickMenu: (id: string) => void }) => {
  const { menus, onClickMenu } = props;

  return (
    <>
      {menus.length > 0 ? (
        <Box m="20px" borderRadius="10px" shadow="md" p={4}>
          {menus.map((menu) => (
            <Box mb={5} key={menu.id}>
              <HStack justify="space-between" mb={1}>
                <Text fontWeight="bold">{menu.name}</Text>
                <EditIcon onClick={() => onClickMenu(menu.id)} />
              </HStack>
              <HStack mb={1}>
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
        </Box>
      ) : (
        <Flex justify="center" align="center" h="70vh">
          <Text>メニューが未登録です。</Text>
        </Flex>
      )}
    </>
  );
});
