import { Flex } from "@chakra-ui/react";
import { NextMonthButton } from "../atoms/button/NextMonthButton";
import { PreviousMonthButton } from "../atoms/button/PreviousMonthButton";
import { MonthInput } from "../atoms/input/MonthInput";

export const MonthHandler = () => {
  return (
    <Flex justify="space-around" align="center" maxW="300px" mx="auto">
      <PreviousMonthButton />
      <MonthInput />
      <NextMonthButton />
    </Flex>
  );
};
