import { NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react";

export const NumberStepper = (props: { numberValue: number | null; setNumber: React.Dispatch<React.SetStateAction<number | null>> }) => {
  const { numberValue, setNumber } = props;

  return (
    <NumberInputStepper>
      <NumberIncrementStepper onClick={() => numberValue && setNumber(numberValue + 1)} />
      <NumberDecrementStepper onClick={() => numberValue && setNumber(numberValue - 1)} />
    </NumberInputStepper>
  );
};
