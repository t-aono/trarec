import { AddIcon } from "@chakra-ui/icons";

export const AddMenuButton = (props: { onClick: () => void }) => {
  return <AddIcon onClick={() => props.onClick()} />;
};
