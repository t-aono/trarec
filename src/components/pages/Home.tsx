import { VFC, memo, useState, useEffect } from "react";
import { Box, Wrap, Flex, useDisclosure, Spacer } from "@chakra-ui/react";

import { HistoryFormModal } from "../organisms/history/HistoryFormModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { History } from "../../types/history";
import { HomeButtons } from "../molecules/HomeButtons";
import { MonthHandler } from "../molecules/MonthHandler";
import { useMonth } from "../../hooks/useMonth";
import { HistoryTable } from "../organisms/history/HistoryTable";
import { MonthInput } from "../atoms/input/MonthInput";
import { Divider } from "@chakra-ui/layout";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getHistories, histories } = useMonthHistories();
  const { month } = useMonth();

  const [isNew, setIsNew] = useState(false);
  const [onSelectedHistory, setOnSelectedHistory] = useState<History | null>(null);

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);
  console.log(histories);

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

  // const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Box mx="auto" my={5}>
        <MonthHandler />
      </Box>
      {histories.length > 0 ? (
        <Wrap p={{ base: 4, md: 10 }} w={{ base: "100%", md: "830px", xl: "1200px" }} mx="auto">
          <HistoryTable histories={histories} onClickEdit={onClickEdit} />
        </Wrap>
      ) : (
        <Flex align="center" justify="center" h="70vh">
          <Box mt={5}>まだ履歴はありません。</Box>
        </Flex>
      )}
      <Box position="fixed" bottom="20px" w="100%">
        <Divider mb="15px" />
        <HomeButtons onClickAdd={onClickAdd} />
      </Box>
      <HistoryFormModal
        isOpen={isOpen}
        onClose={onClose}
        isNew={isNew}
        history={onSelectedHistory}
        getHistories={getHistories}
        month={month}
      ></HistoryFormModal>
    </Box>
  );
});
