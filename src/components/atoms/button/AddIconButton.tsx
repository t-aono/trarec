import { AddIcon } from "@chakra-ui/icons";

export const AddIconButton = (props: { onClickAdd: () => void }) => {
  return <AddIcon onClick={props.onClickAdd} w={5} h={5} />;
};
