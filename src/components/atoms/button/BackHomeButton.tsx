import { Icon } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { useHistory } from "react-router";

export const BackHomeButton = () => {
  const history = useHistory();

  return <Icon as={AiOutlineHome} onClick={() => history.push("/home")} w={8} h={8} />;
};
