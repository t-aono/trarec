import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { VFC } from "react";

import { useMonthHistories } from "../../../hooks/useMonthHistories";

type Props = {
  month: string;
  setMonth: (value: string) => void;
};

export const MonthSelect: VFC<Props> = (props) => {
  const { month, setMonth } = props;
  const { getHistories } = useMonthHistories();

  const onChangeMonth = (value: string) => {
    setMonth(value);
    getHistories(value);
  };

  return (
    <Box px={2} w={{ base: "100%", md: "200px" }}>
      <FormControl>
        <FormLabel fontSize="sm" wordBreak="keep-all">
          対象月
        </FormLabel>
        <Input type="month" value={month} onChange={(e) => onChangeMonth(e.target.value)} />
      </FormControl>
    </Box>
  );
};
