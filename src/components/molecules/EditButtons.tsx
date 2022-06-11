import { Box, Flex, Spacer } from "@chakra-ui/react";
import { AddIconButton } from "../atoms/button/AddIconButton";
import { SettingButton } from "../atoms/button/SettingsButton";

export const EditButtons = (props: { onClickAdd: () => void }) => {
  return (
    <Flex>
      <Box px="4" cursor={"pointer"}>
        <AddIconButton onClickAdd={props.onClickAdd} />
      </Box>
      <Spacer />
      <Box px="4" cursor={"pointer"}>
        <SettingButton />
      </Box>
    </Flex>
  );
};
