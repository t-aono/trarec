import { VFC, memo, useState, useEffect } from "react";
import { Box, Wrap, useDisclosure } from "@chakra-ui/react";

import { HistoryFormModal } from "../organisms/history/HistoryFormModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { History } from "../../types/history";
import { HomeButtons } from "../molecules/HomeButtons";
import { MonthHandler } from "../molecules/MonthHandler";
import { useMonth } from "../../hooks/useMonth";
import { HistoryTable } from "../organisms/history/HistoryTable";
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

  return (
    <Box>
      <Box mx="auto" my={5}>
        <MonthHandler />
      </Box>
      <Wrap p={{ base: 4, md: 10 }} w={{ base: "100%", md: "830px", xl: "1200px" }} mx="auto">
        <HistoryTable histories={histories} onClickEdit={onClickEdit} />
      </Wrap>
      <Box mt={5}>
        <Divider mb={5} />
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
