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
  FormLabel,
  Input,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { collection, addDoc, setDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

import { Menu } from "../../../types/menu";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeleteAlert } from "../../molecules/DeleteAlert";

type Props = {
  menu?: Menu | null;
  isOpen: boolean;
  onClose: () => void;
  getMenus: () => void;
};

export const MenuFormModal: VFC<Props> = memo((props) => {
  const { menu, isOpen, onClose, getMenus } = props;
  const { showMessage } = useMessage();
  const { loginUser } = useLoginUser();
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [count, setCount] = useState<number | null>(1);
  const { db } = useFirebase();
  const isNew = menu?.id ? false : true;

  useEffect(() => {
    setId(menu?.id ?? "");
    setName(menu?.name ?? "");
    setMemo(menu?.memo ?? "");
    setCount(menu?.count ?? 10);
  }, [menu]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeMemo = (e: ChangeEvent<HTMLInputElement>) => setMemo(e.target.value);
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    count > 0 ? setCount(count) : setCount(null);
  };

  const initForm = () => {
    setName("");
    setMemo("");
    setCount(10);
  };

  const onClickRegister = async () => {
    try {
      await addDoc(collection(db, "menus"), {
        name,
        memo,
        count,
        uid: loginUser ? loginUser.uid : "",
        createdAt: serverTimestamp(),
      });
      initForm();
      showMessage({ title: "メニューを追加しました。", status: "success" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getMenus();
  };

  const onClickUpdate = async () => {
    try {
      await setDoc(doc(db, "menus", id), {
        name,
        memo,
        count,
        uid: loginUser ? loginUser.uid : "",
      });
      initForm();
      showMessage({ title: "メニューを更新しました。", status: "success" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getMenus();
  };

  const onClickDelete = async () => {
    await deleteDoc(doc(db, "menus", id));
    setIsDelete(false);
    onClose();
    getMenus();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay>
          <ModalContent pb={2}>
            <ModalHeader>メニュー{isNew ? "追加" : "編集"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>名称</FormLabel>
                  <Input value={name} onChange={onChangeName} />
                </FormControl>
                <FormControl>
                  <FormLabel>メモ</FormLabel>
                  <Input value={memo} onChange={onChangeMemo} />
                </FormControl>
                <FormControl w="100px">
                  <FormLabel>回数</FormLabel>
                  <NumberInput value={count ? count : ""}>
                    <NumberInputField onChange={onChangeCount} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={() => count && setCount(count + 1)} />
                      <NumberDecrementStepper onClick={() => count && setCount(count - 1)} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
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
      <DeleteAlert isDelete={isDelete} setIsDelete={setIsDelete} onClickDelete={onClickDelete} title="メニュー" />
    </>
  );
});
