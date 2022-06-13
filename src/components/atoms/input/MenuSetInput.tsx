import { FormControl, FormLabel, NumberInput, NumberInputField } from "@chakra-ui/react";
import { NumberStepper } from "../button/NumberStepper";
import { ChangeEvent } from "react";

export const MenuSetInput = (props: {
  set: number | null;
  onChangeSet: (e: ChangeEvent<HTMLInputElement>) => void;
  setSet: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { set, onChangeSet, setSet } = props;

  return (
    <FormControl w="100px">
      <FormLabel>セット数</FormLabel>
      <NumberInput value={set ? set : ""}>
        <NumberInputField onChange={onChangeSet} />
        <NumberStepper numberValue={set} setNumber={setSet} />
      </NumberInput>
    </FormControl>
  );
};
