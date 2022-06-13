import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export const MenuMemoInput = (props: { memo: string; onChangeMemo: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  const { memo, onChangeMemo } = props;

  return (
    <FormControl>
      <FormLabel>メモ</FormLabel>
      <Input value={memo} onChange={onChangeMemo} />
    </FormControl>
  );
};
