import { useCallback } from "react";
import { useHistory } from "react-router";
import { Icon } from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";

export const EditMenuButton = () => {
  const history = useHistory();
  const onClick = useCallback(() => history.push("/home/setting"), [history]);

  return <Icon as={AiOutlineUnorderedList} onClick={onClick} w={8} h={8} />;
};
