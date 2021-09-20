import { VFC, memo, useState } from "react";
import { Wrap, Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, useDisclosure } from "@chakra-ui/react"

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { HistoryEditlModal } from "../organisms/history/HistoryEditlModal";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isNew, setIsNew] = useState(false);

  const onClickAdd = () => {
    setIsNew(true);
    onOpen();
  }

  return (
    <>
      <Flex justify="center" mt={5}>
        <PrimaryButton onClick={onClickAdd}>記録</PrimaryButton>
      </Flex>
      <Flex justify="center">
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          <Table variant="simple">
            <TableCaption>トレーニング履歴</TableCaption>
            <Thead>
              <Tr>
                <Th>日付</Th>
                <Th>メニュー</Th>
                <Th isNumeric>回数</Th>
                <Th isNumeric>セット数</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25</Td>
                <Td isNumeric>3</Td>
              </Tr>
            </Tbody>
          </Table>
        </Wrap>
      </Flex>
      <HistoryEditlModal isOpen={isOpen} onClose={onClose} isNew={isNew}></HistoryEditlModal>
    </>
  );
});