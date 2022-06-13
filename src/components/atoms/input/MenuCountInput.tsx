import { FormControl, FormLabel, NumberInput, NumberInputField } from "@chakra-ui/react";
import { NumberStepper } from "../button/NumberStepper";
import { ChangeEvent } from "react";

export const MenuCountInput = (props: {
  count: number | null;
  onChangeCount: (e: ChangeEvent<HTMLInputElement>) => void;
  setCount: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { count, onChangeCount, setCount } = props;

  return (
    <FormControl w="100px">
      <FormLabel>回数</FormLabel>
      <NumberInput value={count ? count : ""}>
        <NumberInputField onChange={onChangeCount} />
        <NumberStepper numberValue={count} setNumber={setCount} />
      </NumberInput>
    </FormControl>
  );
};
