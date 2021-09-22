import React from "react";

import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react"

type Props = {
  isDelete: boolean;
  setIsDelete: (bool: boolean) => void;
}

export const DeleteAlert = (props: Props) => {
  const { isDelete, setIsDelete } = props;
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isDelete}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsDelete(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button mr={3} onClick={() => setIsDelete(false)}>
              キャンセル
            </Button>
            <Button color="white" bg="red.500" onClick={() => setIsDelete(false)}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}