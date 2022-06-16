import { Box, Flex } from "@chakra-ui/react";
import { AddIconButton } from "../atoms/button/AddIconButton";
import { EditMenuButton } from "../atoms/button/EditMenuButton";
import { ChartButton } from "../atoms/button/ChartButton";

export const HomeButtons = (props: { onClickAdd: () => void }) => {
  return (
    <Flex justify="space-around">
      <Box px="4" cursor="pointer">
        <AddIconButton onClickAdd={props.onClickAdd} />
      </Box>
      <Box px="4" cursor="pointer">
        <EditMenuButton />
      </Box>
      <Box px="4" cursor="pointer">
        <ChartButton />
      </Box>
    </Flex>
  );
};
