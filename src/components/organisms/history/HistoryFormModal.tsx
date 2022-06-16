import { VFC, memo, useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormControl,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { collection, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";
import { useMenus } from "../../../hooks/useMenus";
import { History } from "../../../types/history";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { DeleteAlert } from "../../molecules/DeleteAlert";
import { MenuItems } from "../../molecules/MenuItems";
import { EditMenuButton } from "../../atoms/button/EditMenuButton";
import { HistoryDateInput } from "../../atoms/input/HistoryDateInput";

type Props = {
  history: History | null;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
  getHistories: (month: string) => void;
  month: string;
};

export const HistoryFormModal: VFC<Props> = memo((props) => {
  const { history, isOpen, onClose, isNew, getHistories, month } = props;
  const { showMessage } = useMessage();
  const { loading, menus, getMenus } = useMenus();
  const { loginUser } = useLoginUser();
  const { db } = useFirebase();

  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  // const [menuId, setMenuId] = useState<string>("");
  const [count, setCount] = useState<number | null>(1);
  const [set, setSet] = useState<number | null>(1);

  useEffect(() => {
    if (history) {
      setId(history.id);
      setDate(new Date(month + "-" + history.date));
      // setMenuId(history.menuId);
      // setCount(history.count);
      // setSet(history.set);
    }
  }, [history, month]);

  // useEffect(() => {
  //   if (menus.length > 0 && isNew) {
  //     setCount(menus[0].count);
  //     setSet(menus[0].set);
  //   }
  // }, [menus, isNew]);

  // const onChangeMenu = (value: string) => {
  //   const selectedMenu = menus.find((menu) => menu.id === value);
  //   if (selectedMenu) {
  //     setMenuId(selectedMenu.id);
  //     setCount(selectedMenu.count);
  //     setSet(selectedMenu.set);
  //   }
  // };

  // const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
  //   const count = parseInt(e.target.value);
  //   count > 0 ? setCount(count) : setCount(null);
  // };
  // const onChangeSet = (e: ChangeEvent<HTMLInputElement>) => {
  //   const set = parseInt(e.target.value);
  //   set > 0 ? setSet(set) : setSet(null);
  // };

  const initForm = () => {
    // setMenuId("");
    setCount(10);
    setSet(3);
  };

  const onClickRegister = async () => {
    try {
      await addDoc(collection(db, "histories"), {
        date,
        menus: menus,
        uid: loginUser ? loginUser.uid : "",
      });
      initForm();
      showMessage({ title: "記録しました。", status: "success" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getHistories(month);
  };

  const onClickUpdate = async () => {
    try {
      await setDoc(doc(db, "histories", id), {
        date,
        // menuId,
        count,
        set,
        uid: loginUser ? loginUser.uid : "",
      });
      initForm();
      showMessage({ title: "更新しました。", status: "success" });
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
              <Stack mt={4} cursor="pointer">
                <EditMenuButton />
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
                  <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
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
