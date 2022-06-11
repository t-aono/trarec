import { useCallback } from "react";
import { useHistory } from "react-router";
import { SettingsIcon } from "@chakra-ui/icons";

export const SettingButton = () => {
  const history = useHistory();
  const onClickSetting = useCallback(() => history.push("/home/setting"), [history]);

  return <SettingsIcon onClick={onClickSetting} w={5} h={5} />;
};
