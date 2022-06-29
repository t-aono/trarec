import { useEffect, useState, useCallback, memo } from "react";
import { useHistories } from "../../hooks/useHistories";
import { useMonth } from "../../hooks/useMonth";
import { Box, Center, Flex, Text, Divider } from "@chakra-ui/react";

import { HistoryMenu } from "../../types/menu";
import { LineChart } from "../templates/LineChart";
import { BottomLink } from "../molecules/BottomLink";
import { MonthHandler } from "../molecules/MonthHandler";

export const Cart = memo(() => {
  const { getHistories, histories } = useHistories();
  const { month } = useMonth();
  const [labels, setLabels] = useState<string[]>([]);
  const [menus, setMenus] = useState<HistoryMenu[]>([]);
  const [weightDataList, setWeightDataList] = useState<number[][]>([]);
  const [countDataList, setCountDataList] = useState<number[][]>([]);
  const [setDataList, setSetDataList] = useState<number[][]>([]);

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);

  useEffect(() => {
    setLabels(histories.map((history) => String(history.date)));

    const menus: HistoryMenu[] = [];
    histories.forEach((history) =>
      history.menus.forEach((menu) => {
        if (menus.map((exist: HistoryMenu) => exist.id).indexOf(menu.id) === -1) {
          menus.push({ id: menu.id, name: menu.name });
        }
      })
    );
    setMenus(menus);
  }, [histories]);

  const setLineData = useCallback(() => {
    let weights: number[][] = [];
    let counts: number[][] = [];
    let sets: number[][] = [];
    menus.forEach((targetMenu, index) => {
      weights[index] = [];
      counts[index] = [];
      sets[index] = [];
      histories.forEach((history) => {
        history.menus.forEach((menu) => {
          if (menu.id === targetMenu.id) {
            weights[index].push(menu.weight as number);
            counts[index].push(menu.count as number);
            sets[index].push(menu.set as number);
          }
        });
        if (!history.menus.map((menu) => menu.id).includes(targetMenu.id)) {
          counts[index].push(0);
          sets[index].push(0);
        }
      });
    });
    setWeightDataList(weights);
    setCountDataList(counts);
    setSetDataList(sets);
  }, [histories, menus]);

  useEffect(() => {
    if (menus.length > 0) setLineData();
  }, [menus.length, setLineData]);

  return (
    <>
      <Box mx="auto" mt={5} mb={2}>
        <MonthHandler />
      </Box>{" "}
      {histories.length > 0 ? (
        <Flex flexWrap="wrap" justify="center">
          {menus.map((menu, index) => (
            <Box mx={{ base: 1, md: 7 }} my={5} maxW="400px" key={menu.id}>
              <LineChart
                labels={labels}
                menuName={menu.name}
                weightData={weightDataList[index]}
                countData={countDataList[index]}
                setData={setDataList[index]}
              />
            </Box>
          ))}
        </Flex>
      ) : (
        <Center my={24}>
          <Text>履歴がありません。</Text>
        </Center>
      )}
      <Box mt={5} mb={10}>
        <Divider mb={5} />
        <BottomLink />
      </Box>
    </>
  );
});
