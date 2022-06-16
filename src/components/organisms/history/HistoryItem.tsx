import { WrapItem, Box, Stack, Center } from "@chakra-ui/react";

import { History } from "../../../types/history";

type Props = {
  history: History;
  setMenuName: (id: string) => string;
  onClickEdit: (id: string) => void;
};

export const HistoryItem = (props: Props) => {
  const { history, setMenuName, onClickEdit } = props;

  return (
    <WrapItem bg="cyan.50" rounded="lg" my={2}>
      <Box
        fontSize={{ base: "md", md: "sm" }}
        w="100%"
        p={1}
        onClick={() => onClickEdit(history.id)}
        style={{ cursor: "pointer" }}
      >
        <Stack spacing="7px">
          {/* <Center>{setMenuName(history.menuId)}</Center>
          <Center>
            {history.count} × {history.set}
          </Center> */}
        </Stack>
      </Box>
    </WrapItem>
  );
};
