import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { WeightType } from "../../../types/menu";

export const WeightTypeRadio = (props: { radioValue: WeightType; setRadioValue: React.Dispatch<React.SetStateAction<WeightType>> }) => {
  const { radioValue, setRadioValue } = props;

  const onChange = (value: string) => {
    setRadioValue(value as WeightType);
  };

  return (
    <RadioGroup onChange={onChange} value={radioValue}>
      <Stack direction="row" spacing={7}>
        <Radio value="kg">kg</Radio>
        <Radio value="lbs">lbs</Radio>
      </Stack>
    </RadioGroup>
  );
};
