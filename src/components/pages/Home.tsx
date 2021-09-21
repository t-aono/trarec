import { VFC, memo, useState, useEffect } from "react";
import { Center, FormControl, Select, Input, Box, Link, Wrap, Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, useDisclosure, FormLabel } from "@chakra-ui/react"
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { HistoryEditlModal } from "../organisms/history/HistoryEditlModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { useAllMenus } from "../../hooks/useAllMenus";
import { History } from "../../types/history";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getHistories, histories } = useMonthHistories();
  const { getMenus, menus } = useAllMenus();

  const now = new Date();
  const [month, setMonth] = useState(`${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}`);
  const [targetMenu, setTargetMenu] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [onSelectedHistory, setOnSelectedHistory] = useState<History | null>(null);

  useEffect(() => {
    getHistories(month);
    getMenus();
  }, [getHistories, getMenus, month]);

  const onClickAdd = () => {
    setIsNew(true);
    onOpen();
  }

  const onChangeMenu = (value: string) => {
    const selectedMenu = menus.find(menu => menu.id === value);
    if (selectedMenu) {
      setTargetMenu(selectedMenu.id);
    } else {
      setTargetMenu('');
    }
  }

  const onChangeMonth = (value: string) => {
    setMonth(value);
    getHistories(value);
  }

  const onClickEdit = (id: string) => {
    setIsNew(false);
    const history = histories.find(history => history.id === id);
    if (history) setOnSelectedHistory(history);
    onOpen();
  }

  const setMenuName = (menuId: string) => {
    const menu = menus.find(menu => menu.id === menuId);
    return menu ? menu.name : "";
  }

  return (
    <>
      <Flex align="center" mt={5} w="md" mx="auto">
        <Box w="180px">
          <FormLabel fontSize="sm">対象月</FormLabel>
          <Input type="month" value={month} onChange={e => onChangeMonth(e.target.value)} />
        </Box>
        <FormControl w="180px" >
          <FormLabel fontSize="sm">メニュー</FormLabel>
          <Select onChange={(e) => onChangeMenu(e.target.value)}>
            <option></option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>{menu.name}</option>
            ))}
          </Select>
        </FormControl>
        <Box ml="auto">
          <PrimaryButton onClick={onClickAdd}><AddIcon /></PrimaryButton>
        </Box>
      </Flex>
      <Flex justify="center">
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          {histories.length > 0 ? <Table variant="simple">
            <TableCaption>トレーニング履歴</TableCaption>
            <Thead>
              <Tr>
                <Th>日付</Th>
                <Th>メニュー</Th>
                <Th isNumeric>回数</Th>
                <Th isNumeric>セット数</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {histories.map((history) => (targetMenu === '' || targetMenu === history.menuId) && (
                <Tr key={history.id} >
                  <Td>{history.date}</Td>
                  <Td>{setMenuName(history.menuId)}</Td>
                  <Td isNumeric>{history.count}</Td>
                  <Td isNumeric>{history.set}</Td>
                  <Td fontSize="sm"><Link onClick={() => onClickEdit(history.id)}><EditIcon /></Link></Td>
                </Tr>
              ))}
            </Tbody>
          </Table> : <Center w="md">履歴がありません。</Center>}
        </Wrap>
      </Flex>
      <HistoryEditlModal isOpen={isOpen} onClose={onClose} isNew={isNew} history={onSelectedHistory} getHistories={getHistories} month={month} ></HistoryEditlModal>
    </>
  );
});