import { useEffect, useState, useCallback, memo } from "react";
import { useHistories } from "../../hooks/useHistories";
import { useMonth } from "../../hooks/useMonth";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

import { HistoryMenu } from "../../types/menu";
import { LineChart } from "../templates/LineChart";

import { MonthHandler } from "../molecules/MonthHandler";
import Footer from "../organisms/layout/Footer";

export const Cart = memo(() => {
  const { getHistories, histories } = useHistories();
  const { month } = useMonth();
  const [labels, setLabels] = useState<number[][]>([]);
  const [menus, setMenus] = useState<HistoryMenu[]>([]);
  const [weights, setWeights] = useState<number[][]>([]);
  const [counts, setCounts] = useState<number[][]>([]);
  const [sets, setSets] = useState<number[][]>([]);

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);

  useEffect(() => {
    const menus: HistoryMenu[] = [];
    histories.forEach((history) =>
      history.menus.forEach((menu) => {
        if (menus.map((menu: HistoryMenu) => menu.id).indexOf(menu.id) === -1) {
          menus.push({ id: menu.id, name: menu.name });
        }
      })
    );
    setMenus(menus);
  }, [histories]);

  const setLineData = useCallback(() => {
    let labels: number[][] = [];
    let weights: number[][] = [];
    let counts: number[][] = [];
    let sets: number[][] = [];
    menus.forEach((targetMenu, index) => {
      labels[index] = [];
      weights[index] = [];
      counts[index] = [];
      sets[index] = [];
      histories.forEach((history) => {
        history.menus.forEach((menu) => {
          if (menu.id === targetMenu.id) {
            labels[index].push(history.date);
            if (menu.weight) weights[index].push(menu.weight);
            counts[index].push(menu.count ? menu.count : 0);
            sets[index].push(menu.set ? menu.set : 0);
          }
        });
      });
    });
    setLabels(labels);
    setWeights(weights);
    setCounts(counts);
    setSets(sets);
  }, [histories, menus]);

  useEffect(() => {
    if (menus.length > 0) setLineData();
  }, [menus.length, setLineData]);

  return (
    <>
      <Box mx="auto" mt={5} mb={2} px="36px">
        <MonthHandler />
      </Box>
      {histories.length > 0 ? (
        <Flex flexWrap="wrap" justify="center" marginBottom="120px">
          {menus.map((menu, index) => (
            <Box mx={{ base: 1, md: 7 }} my={5} maxW="400px" key={menu.id}>
              <LineChart labels={labels[index]} menuName={menu.name} weightData={weights[index]} countData={counts[index]} setData={sets[index]} />
            </Box>
          ))}
        </Flex>
      ) : (
        <Center my={24}>
          <Text>履歴がありません。</Text>
        </Center>
      )}
      <Footer />
    </>
  );
});
