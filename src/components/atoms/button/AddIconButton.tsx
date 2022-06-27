import { Icon } from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";

export const AddIconButton = (props: { onClickAdd: () => void }) => {
  return <Icon as={FiPlusCircle} onClick={props.onClickAdd} w={8} h={8} />;
};
