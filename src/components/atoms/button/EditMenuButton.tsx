import { useCallback } from "react";
import { useHistory } from "react-router";
import { EditIcon } from "@chakra-ui/icons";

export const EditMenuButton = () => {
  const history = useHistory();
  const onClickSetting = useCallback(() => history.push("/home/setting"), [history]);

  return <EditIcon onClick={onClickSetting} w={5} h={5} />;
};
