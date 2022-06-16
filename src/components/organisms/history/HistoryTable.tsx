import { Center, Box, WrapItem } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { useMonth } from "../../../hooks/useMonth";
import { History } from "../../../types/history";

export const HistoryTable = (props: { histories: History[]; onClickEdit: (id: string) => void }) => {
  const { histories, onClickEdit } = props;

  const { month } = useMonth();

  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const colWidth = { base: "12%", md: "100px", xl: "150px" };

  const firstDate = () => {
    const date = new Date(month);
    date.setDate(1);
    return date;
  };

  const lastDate = () => {
    const date = new Date(month);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return last;
  };

  return (
    <>
      {[...Array(7).keys()].map((d) => (
        <Center key={d} w={colWidth} mx="auto">
          {week[d]}
        </Center>
      ))}
      {[...Array(lastDate().getDate() + firstDate().getDay()).keys()].map((n) =>
        firstDate().getDay() > n ? (
          <Box key={n} w={colWidth}></Box>
        ) : (
          <Box key={n} w={colWidth} border="solid 1px #E2E8F0" p={2} borderRadius="lg" overflow="hidden">
            <Center>{n - firstDate().getDay() + 1}</Center>
            <>
              {histories.map((history) =>
                parseInt(history.date) === n - firstDate().getDay() + 1 ? (
                  <Center key={history.id} my={3}>
                    <Icon
                      viewBox="0 0 200 200"
                      color="cyan.500"
                      _hover={{ opacity: 0.5 }}
                      style={{ cursor: "pointer" }}
                      onClick={() => onClickEdit(history.id)}
                    >
                      <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
                    </Icon>
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
