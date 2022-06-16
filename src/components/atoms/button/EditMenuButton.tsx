import { useCallback } from "react";
import { useHistory } from "react-router";
import { FaRegListAlt } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

export const EditMenuButton = () => {
  const history = useHistory();
  const onClick = useCallback(() => history.push("/home/setting"), [history]);

  return <Icon as={FaRegListAlt} onClick={onClick} w={7} h={7} />;
};
