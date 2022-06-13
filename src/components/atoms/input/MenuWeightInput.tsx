import { ChangeEvent } from "react";
import { FormControl, FormLabel, NumberInput, NumberInputField } from "@chakra-ui/react";
import { NumberStepper } from "../button/NumberStepper";

export const MenuWeightInput = (props: {
  weight: number | null;
  onChangeWeight: (e: ChangeEvent<HTMLInputElement>) => void;
  setWeight: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { weight, onChangeWeight, setWeight } = props;

  return (
    <FormControl w="100px">
      <FormLabel>重さ</FormLabel>
      <NumberInput value={weight ? weight : ""}>
        <NumberInputField onChange={onChangeWeight} />
        <NumberStepper numberValue={weight} setNumber={setWeight} />
      </NumberInput>
    </FormControl>
  );
};
