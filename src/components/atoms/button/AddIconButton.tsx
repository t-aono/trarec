import { Icon } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";

export const AddIconButton = (props: { onClickAdd: () => void }) => {
  return <Icon as={AiOutlinePlusSquare} onClick={props.onClickAdd} w={8} h={8} />;
};
