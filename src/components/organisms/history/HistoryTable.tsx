import { Center, Box, WrapItem } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { useMonth } from "../../../hooks/useMonth";
import { History } from "../../../types/history";
import { HistoryDotIcon } from "../../atoms/icon/HistoryDotIcon";

export const HistoryTable = (props: { histories: History[]; onClickEdit: (id: string) => void }) => {
  const { histories, onClickEdit } = props;

  const { month } = useMonth();

  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const firstDate = new Date(month);
  firstDate.setDate(1);
  const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);
  const colWidth = { base: "12%", md: "100px", xl: "150px" };
  const colHeight = "70px";

  return (
    <>
      {[...Array(7).keys()].map((d) => (
        <Center key={d} w={colWidth} mx="auto">
          {week[d]}
        </Center>
      ))}
      {[...Array(lastDate.getDate() + firstDate.getDay()).keys()].map((n) =>
        firstDate.getDay() > n ? (
          <Box key={n} w={colWidth}></Box>
        ) : (
          <Box key={n} w={colWidth} h={colHeight} border="solid 1px #E2E8F0" p={2} borderRadius="md" overflow="hidden">
            <Center>{n - firstDate.getDay() + 1}</Center>
            <>
              {histories.map((history) =>
                parseInt(history.date) === n - firstDate.getDay() + 1 ? (
                  <Center key={history.id} my={3}>
                    <HistoryDotIcon historyId={history.id} onClickEdit={onClickEdit} />
                  </Center>
                ) : (
                  <WrapItem key={history.id}></WrapItem>
                )
              )}
            </>
          </Box>
        )
      )}
    </>
  );
};
