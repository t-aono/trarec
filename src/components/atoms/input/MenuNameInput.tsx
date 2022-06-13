import { ChangeEvent } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";

export const MenuNameInput = (props: { name: string; onChangeName: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  const { name, onChangeName } = props;

  return (
    <FormControl>
      <FormLabel>名称</FormLabel>
      <Input value={name} onChange={onChangeName} />
    </FormControl>
  );
};
