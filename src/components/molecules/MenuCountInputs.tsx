import { ChangeEvent } from "react";
import { Flex } from "@chakra-ui/layout";
import { MenuCountInput } from "../atoms/input/MenuCountInput";
import { MenuSetInput } from "../atoms/input/MenuSetInput";

export const MenuCountInputs = (props: {
  count: number | null;
  onChangeCount: (e: ChangeEvent<HTMLInputElement>) => void;
  setCount: React.Dispatch<React.SetStateAction<number | null>>;
  set: number | null;
  onChangeSet: (e: ChangeEvent<HTMLInputElement>) => void;
  setSet: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { count, onChangeCount, setCount, set, onChangeSet, setSet } = props;

  return (
    <Flex gridColumnGap={10}>
      <MenuCountInput count={count} onChangeCount={onChangeCount} setCount={setCount} />
      <MenuSetInput set={set} onChangeSet={onChangeSet} setSet={setSet} />
    </Flex>
  );
};
