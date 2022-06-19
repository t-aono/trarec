import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FormControl, Input } from "@chakra-ui/react";

export const HistoryDateInput = (props: { date: Date; setDate: Dispatch<SetStateAction<Date>> }) => {
  const { date, setDate } = props;
  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value));

  return (
    <FormControl>
      <Input
        type="date"
        value={`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`}
        onChange={onChangeDate}
        w="180px"
      />
    </FormControl>
  );
};
