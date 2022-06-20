import { memo, useState } from "react";
import { Box, Wrap, useDisclosure } from "@chakra-ui/react";

import { HistoryFormModal } from "../organisms/history/HistoryFormModal";
import { useHistories } from "../../hooks/useHistories";
import { History } from "../../types/history";
import { HomeButtons } from "../molecules/HomeButtons";
import { MonthHandler } from "../molecules/MonthHandler";
import { HistoryTable } from "../organisms/history/HistoryTable";
import { Divider } from "@chakra-ui/layout";

export const Home = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { histories } = useHistories();

  const [isNew, setIsNew] = useState(false);
  const [selectedHistory, onSelectHistory] = useState<History | null>(null);

  const onClickAdd = () => {
    setIsNew(true);
    onOpen();
  };

  const onClickEdit = (id: string) => {
    setIsNew(false);
    const history = histories.find((history) => history.id === id);
    if (history) onSelectHistory(history);
    onOpen();
  };

  return (
    <Box>
      <Box mx="auto" my={5}>
        <MonthHandler />
      </Box>
      <Wrap p={{ base: 4, md: 10 }} w={{ base: "100%", md: "830px", xl: "1200px" }} mx="auto">
        <HistoryTable onClickEdit={onClickEdit} />
      </Wrap>
      <Box my={5}>
        <Divider mb={5} />
        <HomeButtons onClickAdd={onClickAdd} />
      </Box>
      <HistoryFormModal isOpen={isOpen} onClose={onClose} isNew={isNew} history={selectedHistory}></HistoryFormModal>
    </Box>
  );
});
