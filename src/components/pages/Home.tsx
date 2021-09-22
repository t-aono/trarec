import { VFC, memo, useState, useEffect } from "react";
import { Center, Box, Wrap, WrapItem, Flex, useDisclosure, Spacer } from "@chakra-ui/react"
import { EditIcon, Icon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/media-query";

import { HistoryEditlModal } from "../organisms/history/HistoryEditlModal";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { useAllMenus } from "../../hooks/useAllMenus";
import { History } from "../../types/history";
import { DeleteAlert } from "../molecules/DeleteAlert";
import { MonthSelect } from "../atoms/input/MonthSelect";
import { MenuSelect } from "../atoms/select/MenuSelect";
import { HistoryItem } from "../organisms/history/HistoryItem";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getHistories, histories } = useMonthHistories();
  const { getMenus, menus } = useAllMenus();

  const now = new Date();
  const [isDelete, setIsDelete] = useState(false);
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
  const colWidth = { base: "12%", md: "100px", xl: "150px" };
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex justify="center" align="end" mt={5} w="80%" maxW="750px" mx="auto" wrap={{ base: "wrap", md: "nowrap" }}>
        <MonthSelect month={month} setMonth={setMonth} />
        <MenuSelect menus={menus} setTargetMenu={setTargetMenu} />
        <Spacer />
        <Box pt={5} mx={5} mb={3}>
          <EditIcon onClick={onClickAdd} w={7} h={7} />
        </Box>
      </Flex>
      {histories.length > 0 ? (
        <Wrap p={{ base: 4, md: 10 }} justify={{ base: "center", md: "start" }} w={{ base: "100%", md: "830px", xl: "1200px" }} mx="auto">
          {[...Array(7).keys()].map(d => (
            <Center key={d} w={colWidth} mx="auto">{week[d]}</Center>
          ))}
          {[...Array(lastDate().getDate() + firstDate().getDay()).keys()].map(n => (
            firstDate().getDay() > n ? (
              <Box key={n} w={colWidth}></Box>
            ) : (
              <Box key={n} w={colWidth} border="solid 1px #E2E8F0" p={2} borderRadius="lg" overflow="hidden">
                <Center>{n - firstDate().getDay() + 1}</Center>
                <>
                  {histories.map(history => parseInt(history.date) === (n - firstDate().getDay() + 1) ? (
                    (targetMenu === '' || targetMenu === history.menuId ? (
                      isMobile ? (
                        <Center key={history.id} my={3}>
                          <Icon viewBox="0 0 200 200" color="cyan.500" _hover={{ opacity: 0.5 }} style={{ cursor: 'pointer' }} onClick={() => onClickEdit(history.id)}>
                            <path
                              fill="currentColor"
                              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                            />
                          </Icon>
                        </Center>
                      ) : (
                        <HistoryItem key={history.id} history={history} setMenuName={setMenuName} onClickEdit={onClickEdit} />
                      )
                    ) : <WrapItem key={history.id}></WrapItem>)
                  ) : <WrapItem key={history.id}></WrapItem>)}
                </>
              </Box>
            )
          ))}
        </Wrap>
      ) : (
        <Center mt={5}>ありませんね。</Center>
      )}
      <HistoryEditlModal isOpen={isOpen} onClose={onClose} isNew={isNew} history={onSelectedHistory} getHistories={getHistories} month={month} setIsDelete={setIsDelete} ></HistoryEditlModal>
      <DeleteAlert isDelete={isDelete} setIsDelete={setIsDelete} />
    </>
  );
});