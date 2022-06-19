import { Icon } from "@chakra-ui/icons";

export const HistoryDotIcon = (props: { historyId: string; onClickEdit: (id: string) => void }) => {
  const { historyId, onClickEdit } = props;

  return (
    <Icon
      viewBox="0 0 200 200"
      color="cyan.500"
      _hover={{ opacity: 0.5 }}
      style={{ cursor: "pointer" }}
      onClick={() => onClickEdit(historyId)}
    >
      <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
    </Icon>
  );
};
