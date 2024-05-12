import { Icon } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import { useHistory } from "react-router";

export const BackHomeButton = () => {
  const history = useHistory();

  return <Icon as={AiOutlineCalendar} onClick={() => history.push("/home")} w={8} h={8} />;
};
