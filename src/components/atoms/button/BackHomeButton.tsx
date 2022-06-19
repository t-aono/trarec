import { Icon } from "@chakra-ui/react";
import { AiOutlineRollback } from "react-icons/ai";
import { useHistory } from "react-router";

export const BackHomeButton = () => {
  const history = useHistory();

  return <Icon as={AiOutlineRollback} onClick={() => history.push("/home")} w={6} h={6} />;
};
