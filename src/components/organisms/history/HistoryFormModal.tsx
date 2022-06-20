import { memo, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";
import { useMenus } from "../../../hooks/useMenus";
import { History } from "../../../types/history";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { DeleteAlert } from "../../molecules/DeleteAlert";
import { MenuItems } from "../../molecules/MenuItems";
import { HistoryDateInput } from "../../atoms/input/HistoryDateInput";

type Props = {
  history: History | null;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
  getHistories: (month: string) => void;
  month: string;
};

export const HistoryFormModal = memo((props: Props) => {
  const { history, isOpen, onClose, isNew, getHistories, month } = props;
  const { showMessage } = useMessage();
  const { loading, menus, getMenus } = useMenus();
  const { loginUser } = useLoginUser();
  const { db } = useFirebase();

  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (history) {
      setId(history.id);
      setDate(new Date(month + "-" + history.date));
    }
  }, [history, month]);

  const onClickRegister = async () => {
    try {
      await addDoc(collection(db, "histories"), {
        date,
        menus: menus,
        uid: loginUser ? loginUser.uid : "",
      });
      showMessage({ title: "記録しました。", status: "success" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getHistories(month);
  };

  const onClickDelete = async () => {
    await deleteDoc(doc(db, "histories", id));
    setIsDelete(false);
    onClose();
    getHistories(month);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay>
          <ModalContent pb={2}>
            <ModalHeader>履歴{isNew ? "追加" : "編集"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={3}>
                <HistoryDateInput date={date} setDate={setDate} />
              </Stack>
              <Stack mt={5} mx={1}>
                <MenuItems loading={loading} menus={menus} getMenus={getMenus} />
              </Stack>
            </ModalBody>
            <ModalFooter justifyContent={isNew ? "end" : "space-between"}>
              {isNew ? (
                <PrimaryButton onClick={onClickRegister}>登録</PrimaryButton>
              ) : (
                <>
                  <DeleteIcon
                    color="red.500"
                    w={5}
                    h={5}
                    onClick={() => setIsDelete(true)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <DeleteAlert isDelete={isDelete} setIsDelete={setIsDelete} onClickDelete={onClickDelete} title="履歴" />
    </>
  );
});
