import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useMonthHistories } from "../../../hooks/useMonthHistories";

type Props = {
  month: string;
  setMonth: (value: string) => void;
};

export const MonthSelect = (props: Props) => {
  const { month, setMonth } = props;
  const { getHistories } = useMonthHistories();

  const onChangeMonth = (value: string) => {
    setMonth(value);
    getHistories(value);
  };

  return (
    <Box px={2} w={{ base: "100%", md: "200px" }}>
      <FormControl>
        <Input type="month" value={month} onChange={(e) => onChangeMonth(e.target.value)} />
      </FormControl>
    </Box>
  );
};
