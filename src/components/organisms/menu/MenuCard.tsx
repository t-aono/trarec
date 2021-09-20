import { VFC, memo } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

import { Menu } from "../../../types/menu";

type Props = {
  menu: Menu;
  onClick: (id: string) => void
}

export const MenuCard: VFC<Props> = memo((props) => {
  const { menu, onClick } = props;
  return (
    <Box
      w="260px"
      h="90px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ curror: "pointer", opacity: 0.8 }}
      onClick={() => onClick(menu.id)}
    >
      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="bold">{menu.name}</Text>
        <Text fontSize="sm">{menu.count} 回 × {menu.set} セット</Text>
      </Stack>
    </Box>
  );
});