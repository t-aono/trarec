import { Box, Flex, Spacer } from "@chakra-ui/react";
import { EditIconButton } from "../atoms/button/EditIconButton";
import { SettingButton } from "../atoms/button/SettingsButton";

export const EditButtons = () => {
  return (
    <Flex>
      <Box px="3" cursor={"pointer"}>
        <SettingButton />
      </Box>
      <Spacer />
      <Box px="3" cursor={"pointer"}>
        <EditIconButton />
      </Box>
    </Flex>
  );
};
