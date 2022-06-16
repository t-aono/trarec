import { Flex } from "@chakra-ui/react";
import { NextMonthButton } from "../atoms/button/NextMonthButton";
import { PreviousMonthButton } from "../atoms/button/PreviousMonthButton";
import { MonthInput } from "../atoms/input/MonthInput";

export const MonthHandler = () => {
  return (
    <Flex justify="center" align="center">
      <PreviousMonthButton />
      <MonthInput />
      <NextMonthButton />
    </Flex>
  );
};
