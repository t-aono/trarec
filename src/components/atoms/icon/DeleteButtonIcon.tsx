import { DeleteIcon } from "@chakra-ui/icons";

export const DeleteButtonIcon = (props: { onClick: (bool: boolean) => void }) => {
  return <DeleteIcon color="red.500" w={5} h={5} onClick={() => props.onClick(true)} style={{ cursor: "pointer" }} />;
};
