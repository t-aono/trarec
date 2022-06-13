import { ArrowBackIcon } from "@chakra-ui/icons";
import { useMonth } from "../../../hooks/useMonth";

export const PreviousMonthButton = () => {
  const { month, setMonth } = useMonth();

  const onClickPrevious = () => {
    const yearMonth = month.split("-");
    setMonth(`${yearMonth[0]}-${("0" + (parseInt(yearMonth[1], 10) - 1)).slice(-2)}`);
  };

  return <ArrowBackIcon onClick={() => onClickPrevious()} w={6} h={6} cursor="pointer" />;
};
