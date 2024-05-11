import React from "react";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";

type Props = {
  isDelete: boolean;
  setIsDelete: (bool: boolean) => void;
  onClickDelete: () => void;
  title: string;
};

export const DeleteAlert = (props: Props) => {
  const { isDelete, setIsDelete, onClickDelete, title } = props;
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isDelete} leastDestructiveRef={cancelRef} onClose={() => setIsDelete(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title} 削除
          </AlertDialogHeader>

          <AlertDialogBody>削除しますか？</AlertDialogBody>

          <AlertDialogFooter>
            <Button mr={3} onClick={() => setIsDelete(false)}>
              キャンセル
            </Button>
            <Button color="white" bg="red.500" onClick={() => onClickDelete()}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
