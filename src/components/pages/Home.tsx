import { VFC, memo, useState, useEffect } from "react";
import { Center, FormControl, Select, Input, Box, Wrap, WrapItem, Flex, useDisclosure, FormLabel, Stack } from "@chakra-ui/react"
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

  const firstDate = () => {
    const date = new Date(month);
    date.setDate(1);
    return date;
  }

  const lastDate = () => {
    const date = new Date(month);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return last;
  }

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

  const week = ['日', '月', '火', '水', '木', '金', '土'];

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
      {histories.length > 0 ? (
        <Wrap p={{ base: 4, md: 10 }} justify="start" w="830px" mx="auto">
          {[...Array(7).keys()].map(d => (
            <Center key={d} w="100px" mx="auto">{week[d]}</Center>
          ))}
          {[...Array(lastDate().getDate() + firstDate().getDay()).keys()].map(n => (
            firstDate().getDay() > n ? (
              <Box key={n} w="100px"></Box>
            ) : (
              <Box key={n} w="100px" border="solid 1px #E2E8F0" p={2} borderRadius="lg" overflow="hidden">
                <Center>{n - firstDate().getDay() + 1} 日</Center>
                <>
                  {histories.map(history => parseInt(history.date) === (n - firstDate().getDay() + 1) ? (
                    (targetMenu === '' || targetMenu === history.menuId ? (
                      <WrapItem key={history.id} bg="cyan.50" rounded="lg" my={2}>
                        <Box fontSize="sm" w="100%" p={1}>
                          <Stack spacing="7px">
                            <Center>{setMenuName(history.menuId)}</Center>
                            <Center>
                              {history.count} × {history.set}
                              <EditIcon ml={3} onClick={() => onClickEdit(history.id)} />
                            </Center>
                          </Stack>
                        </Box>
                      </WrapItem>
                    ) : <WrapItem key={history.id}></WrapItem>)
                  ) : <WrapItem key={history.id}></WrapItem>)}
                </>
              </Box>
            )
          ))}
        </Wrap>
      ) : (
        <Box>ありませんね。</Box>
      )}
      <HistoryEditlModal isOpen={isOpen} onClose={onClose} isNew={isNew} history={onSelectedHistory} getHistories={getHistories} month={month} ></HistoryEditlModal>
    </>
  );
});