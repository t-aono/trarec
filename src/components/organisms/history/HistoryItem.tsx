import { WrapItem, Box, Stack, Center, Flex } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { History } from "../../../types/history";

type Props = {
  history: History;
  setMenuName: (id: string) => string;
  onClickEdit: (id: string) => void;
}

export const HistoryItem = (props: Props) => {
  const { history, setMenuName, onClickEdit } = props;

  return (
    <WrapItem bg="cyan.50" rounded="lg" my={2}>
      <Box fontSize={{ base: "md", md: "sm" }} w="100%" p={1}>
        <Stack spacing="7px">
          <Center>{setMenuName(history.menuId)}</Center>
          <Center>
            {history.count} × {history.set}
          </Center>
          <Flex>
            <EditIcon mr="auto" ml={{ base: 2, md: 0 }} w={{ base: 5, md: 4 }} h={{ base: 5, md: 4 }} onClick={() => onClickEdit(history.id)} />
          </Flex>
        </Stack>
      </Box>
    </WrapItem>
  );
}