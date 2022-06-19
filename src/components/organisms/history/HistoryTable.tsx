import { useState, useEffect } from "react";
import { Center, Box, WrapItem } from "@chakra-ui/react";
import { useMonth } from "../../../hooks/useMonth";
import { History } from "../../../types/history";
import { HistoryDotIcon } from "../../atoms/icon/HistoryDotIcon";

export const HistoryTable = (props: { histories: History[]; onClickEdit: (id: string) => void }) => {
  const { histories, onClickEdit } = props;
  const { month } = useMonth();
  const [dates, setDates] = useState<{ date: number; isThisMonth: boolean }[]>([]);

  const colWidth = { base: "12%", md: "100px", xl: "150px" };
  const week = ["日", "月", "火", "水", "木", "金", "土"];

  useEffect(() => {
    const firstDate = new Date(month);
    firstDate.setDate(1);
    const firstDay = firstDate.getDay();
    const leftTopDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0 - firstDay);
    let dateList = [];
    for (let i = 0; i < 35; i++) {
      leftTopDate.setDate(leftTopDate.getDate() + 1);
      dateList.push({
        date: leftTopDate.getDate(),
        isThisMonth: leftTopDate.getMonth() + 1 === Number(month.split("-")[1]),
      });
    }
    setDates(dateList);
  }, [month]);

  return (
    <>
      {[...Array(7).keys()].map((d) => (
        <Center key={d} w={colWidth} mx="auto">
          {week[d]}
        </Center>
      ))}
      {dates.length > 0 &&
        dates.map((d, i) => (
          <Box key={i} w={colWidth} h="70px" border="solid 1px #E2E8F0" p={2} borderRadius="md" overflow="hidden">
            <Center color={!d.isThisMonth ? "lightgray" : ""}>{d.date}</Center>
            <>
              {histories.map((history) =>
                parseInt(history.date) === d.date ? (
                  <Center key={history.id} my={3}>
                    <HistoryDotIcon historyId={history.id} onClickEdit={onClickEdit} />
                  </Center>
                ) : (
                  <WrapItem key={history.id}></WrapItem>
                )
              )}
            </>
          </Box>
        ))}
    </>
  );
};
