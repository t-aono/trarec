import { VFC, memo, useState, useEffect } from "react";
import { Box, Wrap, Flex, useDisclosure, Spacer } from "@chakra-ui/react";

import { HistoryFormModal } from "../organisms/history/HistoryFormModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { History } from "../../types/history";
import { EditButtons } from "../molecules/EditButtons";
import { MonthHandler } from "../molecules/MonthHandler";
import { useMonth } from "../../hooks/useMonth";
import { HistoryTable } from "../organisms/history/HistoryTable";

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
          <HistoryTable histories={histories} onClickEdit={onClickEdit} />
        </Wrap>
      ) : (
        <Flex align="center" justify="center" h="70vh">
          <Box mt={5}>まだ履歴はありません。</Box>
        </Flex>
      )}
      <HistoryFormModal
        isOpen={isOpen}
        onClose={onClose}
        isNew={isNew}
        history={onSelectedHistory}
        getHistories={getHistories}
        month={month}
      ></HistoryFormModal>
    </>
  );
});
