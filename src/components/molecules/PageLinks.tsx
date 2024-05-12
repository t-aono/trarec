import { Box, Flex } from "@chakra-ui/react";

import { EditMenuButton } from "../atoms/button/EditMenuButton";
import { ChartButton } from "../atoms/button/ChartButton";
import { BackHomeButton } from "../atoms/button/BackHomeButton";

export const PageLinks = () => {
  return (
    <Flex justify="space-around" w="full">
      <Box px="4" cursor="pointer">
        <BackHomeButton />
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
