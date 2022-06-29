import { Box, FormControl, Input } from "@chakra-ui/react";
import { useMonth } from "../../../hooks/useMonth";

export const MonthInput = () => {
  const { month, setMonth } = useMonth();

  const onChangeMonth = (value: string) => {
    setMonth(value);
  };

  return (
    <Box px={2}>
      <FormControl>
        <Input type="month" value={month} onChange={(e) => onChangeMonth(e.target.value)} />
      </FormControl>
    </Box>
  );
};
