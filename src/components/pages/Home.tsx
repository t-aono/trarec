import { memo, useState } from "react";
import { Flex, Wrap, useDisclosure } from "@chakra-ui/react";

import { HistoryFormModal } from "../organisms/history/HistoryFormModal";
import { useHistories } from "../../hooks/useHistories";
import { History } from "../../types/history";
import { MonthHandler } from "../molecules/MonthHandler";
import { HistoryTable } from "../organisms/history/HistoryTable";
import Footer from "../organisms/layout/Footer";
import { AddIconButton } from "../atoms/button/AddIconButton";

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
    <>
      <Flex mt={5} alignItems="center" justifyContent="space-around">
        <MonthHandler />
        <AddIconButton onClickAdd={onClickAdd} />
      </Flex>
      <Wrap p={{ base: 4, md: 10 }} w={{ base: "100%", md: "830px", xl: "1200px" }} mx="auto">
        <HistoryTable onClickEdit={onClickEdit} />
      </Wrap>
      <HistoryFormModal isOpen={isOpen} onClose={onClose} isNew={isNew} history={selectedHistory}></HistoryFormModal>
      <Footer />
    </>
  );
});
