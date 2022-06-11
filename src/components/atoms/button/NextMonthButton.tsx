import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useMonth } from "../../../hooks/useMonth";

export const NextMonthButton = () => {
  const { month, setMonth } = useMonth();

  const onClickNext = () => {
    const yearMonth = month.split("-");
    setMonth(`${yearMonth[0]}-${("0" + (parseInt(yearMonth[1], 10) + 1)).slice(-2)}`);
  };

  return <ArrowForwardIcon onClick={() => onClickNext()} w={6} h={6} cursor="pointer" />;
};
