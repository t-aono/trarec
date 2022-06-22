import { useEffect, useState, useCallback } from "react";
import { useHistories } from "../../hooks/useHistories";
import { useMonth } from "../../hooks/useMonth";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { BackHomeButton } from "../atoms/button/BackHomeButton";

import { HistoryMenu } from "../../types/menu";
import { LineChart } from "../templates/LineChart";

export const Cart = () => {
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
      {histories.length > 0 ? (
        <Flex flexWrap="wrap" display={{ base: "block", md: "flex" }}>
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
        <Center mt={10}>
          <Text>履歴がありません。</Text>
        </Center>
      )}
      <Box mt={5} mb={10} ml={7}>
        <BackHomeButton />
      </Box>
    </>
  );
};
