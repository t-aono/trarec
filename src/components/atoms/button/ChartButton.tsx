import { useCallback } from "react";
import { useHistory } from "react-router";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineLineChart } from "react-icons/ai";

export const ChartButton = () => {
  const history = useHistory();
  const onClick = useCallback(() => history.push("/home/chart"), [history]);

  return <Icon as={AiOutlineLineChart} onClick={onClick} w={7} h={7} />;
};
