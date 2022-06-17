import { useEffect, useState, useCallback } from "react";
import { useMonthHistories } from "../../hooks/useMonthHistories";
import { useMonth } from "../../hooks/useMonth";
import { Box, Center, Text } from "@chakra-ui/react";
import { BackHomeButton } from "../atoms/button/BackHomeButton";

import { HistoryMenu } from "../../types/menu";
import { MenuSelect } from "../atoms/select/MenuSelect";
import { LineChart } from "../templates/LineChart";

export const Cart = () => {
  const { getHistories, histories } = useMonthHistories();
  const { month } = useMonth();
  const [labels, setLabels] = useState<string[]>([]);
  const [menus, setMenus] = useState<HistoryMenu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<HistoryMenu>();
  const [weightData, setWeightData] = useState<number[]>([]);
  const [countData, setCountData] = useState<number[]>([]);

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);

  useEffect(() => {
    setLabels(histories.map((history) => history.date));

    const menus: HistoryMenu[] = [];
    histories.forEach((history) =>
      history.menus.forEach((menu) => {
        if (menus.map((exist: HistoryMenu) => exist.id).indexOf(menu.id) === -1) {
          menus.push({ id: menu.id, name: menu.name });
        }
      })
    );
    setMenus(menus);
    setSelectedMenu(menus[0]);
  }, [histories]);

  const setLineData = useCallback(() => {
    setWeightData([]);
    setCountData([]);
    let weights: number[] = [];
    let counts: number[] = [];
    histories.forEach((history) =>
      history.menus.forEach((menu) => {
        if (menu.id === (selectedMenu as HistoryMenu).id) {
          weights.push(menu.weight as number);
          counts.push((menu.count as number) * (menu.set as number));
        }
      })
    );
    setWeightData(weights);
    setCountData(counts);
  }, [histories, selectedMenu]);

  useEffect(() => {
    if (menus.length > 0) setLineData();
  }, [menus.length, setLineData]);

  const selectMenu = useCallback((menu) => {
    setSelectedMenu(menu);
  }, []);

  return (
    <>
      {histories.length > 0 ? (
        <>
          <Box my={{ base: 3, md: 7 }} mx="auto" w={{ base: "80%", md: "md" }}>
            <MenuSelect menus={menus} selectMenu={selectMenu} setLineData={setLineData} />
          </Box>
          <Box m={{ base: 1, md: 7 }}>
            <LineChart labels={labels} weightData={weightData} countData={countData} />
          </Box>
        </>
      ) : (
        <Center mt={10}>
          <Text>履歴がありません。</Text>
        </Center>
      )}
      <Box my={5} ml={7}>
        <BackHomeButton />
      </Box>
    </>
  );
};
