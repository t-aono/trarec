import { ChangeEvent } from "react";
import { Flex } from "@chakra-ui/layout";
import { MenuWeightInput } from "../atoms/input/MenuWeightInput";
import { WeightType } from "../../types/menu";
import { WeightTypeRadio } from "../atoms/radio/WeightTypeRadio";

export const MenuWeightInputs = (props: {
  weight: number | null;
  onChangeWeight: (e: ChangeEvent<HTMLInputElement>) => void;
  setWeight: React.Dispatch<React.SetStateAction<number | null>>;
  weightType: WeightType;
  setWeightType: React.Dispatch<React.SetStateAction<WeightType>>;
}) => {
  const { weight, onChangeWeight, setWeight, weightType, setWeightType } = props;

  return (
    <Flex alignItems="flex-end" gridColumnGap={10}>
      <MenuWeightInput weight={weight} onChangeWeight={onChangeWeight} setWeight={setWeight} />
      <WeightTypeRadio radioValue={weightType} setRadioValue={setWeightType} />
    </Flex>
  );
};
