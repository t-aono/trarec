import { VFC, memo, useState, useEffect } from "react";
import { Center, Box, Wrap, WrapItem, Flex, useDisclosure, Spacer } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

import { HistoryEditlModal } from "../organisms/history/HistoryEditlModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { History } from "../../types/history";
import { EditButtons } from "../molecules/EditButtons";
import { MonthHandler } from "../molecules/MonthHandler";
import { useMonth } from "../../hooks/useMonth";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getHistories, histories } = useMonthHistories();
  const { month } = useMonth();

  const [isNew, setIsNew] = useState(false);
  const [onSelectedHistory, setOnSelectedHistory] = useState<History | null>(null);

  useEffect(() => {
    getHistories(month);
  }, [month]);

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

  const onClickAdd = () => {
    setIsNew(true);
    onOpen();
  };

  const onClickEdit = (id: string) => {
    setIsNew(false);
    const history = histories.find((history) => history.id === id);
    if (history) setOnSelectedHistory(history);
    onOpen();
  };

  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const colWidth = { base: "12%", md: "100px", xl: "150px" };
  // const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex justify="center" align="center" w="95%" mx="auto" my={5}>
        <MonthHandler />
        <Spacer />
        <EditButtons onClickAdd={onClickAdd} />
      </Flex>
      {histories.length > 0 ? (
        <Wrap
          p={{ base: 4, md: 10 }}
          justify={{ base: "center", md: "start" }}
          w={{ base: "100%", md: "830px", xl: "1200px" }}
          mx="auto"
        >
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
        </Wrap>
      ) : (
        <Flex align="center" justify="center" h="70vh">
          <Center mt={5}>まだ履歴はありません。</Center>
        </Flex>
      )}
      <HistoryEditlModal
        isOpen={isOpen}
        onClose={onClose}
        isNew={isNew}
        history={onSelectedHistory}
        getHistories={getHistories}
        month={month}
      ></HistoryEditlModal>
    </>
  );
});
