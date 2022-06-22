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
  Text,
} from "@chakra-ui/react";
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
import { useHistories } from "../../../hooks/useHistories";
import { useMonth } from "../../../hooks/useMonth";
import { DeleteButtonIcon } from "../../atoms/icon/DeleteButtonIcon";

type Props = {
  history: History | null;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
};

export const HistoryFormModal = memo((props: Props) => {
  const { history, isOpen, onClose, isNew } = props;
  const { month } = useMonth();
  const { getHistories } = useHistories();
  const { showMessage } = useMessage();
  const { menus } = useMenus();
  const { loginUser } = useLoginUser();
  const { db } = useFirebase();

  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getHistories(month);
  }, [getHistories, month]);

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
            <ModalHeader>履歴{isNew ? "追加" : "詳細"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack>
                {isNew ? (
                  <HistoryDateInput date={date} setDate={setDate} />
                ) : (
                  <Text>{`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`}</Text>
                )}
              </Stack>
              <Stack mt={5} mx={1}>
                <MenuItems history={history} />
              </Stack>
            </ModalBody>
            <ModalFooter justifyContent={isNew ? "end" : "space-between"}>
              {isNew ? (
                <PrimaryButton onClick={onClickRegister}>登録</PrimaryButton>
              ) : (
                <DeleteButtonIcon onClick={() => setIsDelete(true)} />
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <DeleteAlert isDelete={isDelete} setIsDelete={setIsDelete} onClickDelete={onClickDelete} title="履歴" />
    </>
  );
});
