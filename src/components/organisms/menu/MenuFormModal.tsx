import { VFC, memo, useState, useEffect, ChangeEvent, useCallback } from "react";
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
import { collection, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { Menu, WeightType } from "../../../types/menu";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeleteAlert } from "../../molecules/DeleteAlert";
import { MenuNameInput } from "../../atoms/input/MenuNameInput";
import { MenuMemoInput } from "../../atoms/input/MenuMemoInput";
import { MenuWeightInputs } from "../../molecules/MenuWeightInputs";
import { MenuCountInputs } from "../../molecules/MenuCountInputs";

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
  const [weight, setWeight] = useState<number | null>(1);
  const [weightType, setWeightType] = useState<WeightType>("kg");
  const [count, setCount] = useState<number | null>(1);
  const [set, setSet] = useState<number | null>(2);
  const { db } = useFirebase();
  const isNew = menu?.id ? false : true;

  useEffect(() => {
    setId(menu?.id ?? "");
    setName(menu?.name ?? "");
    setMemo(menu?.memo ?? "");
    setWeight(menu?.weight ?? null);
    setCount(menu?.count ?? 10);
    setSet(menu?.set ?? 2);
  }, [menu]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeMemo = (e: ChangeEvent<HTMLInputElement>) => setMemo(e.target.value);
  const onChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const weight = parseInt(e.target.value);
    weight > 0 ? setWeight(weight) : setWeight(null);
  };
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    count > 0 ? setCount(count) : setCount(null);
  };
  const onChangeSet = (e: ChangeEvent<HTMLInputElement>) => {
    const set = parseInt(e.target.value);
    set > 1 ? setSet(set) : setSet(1);
  };

  const initForm = useCallback(() => {
    setName("");
    setMemo("");
    setWeight(null);
    setCount(10);
    setSet(2);
  }, []);

  const onClickRegister = async () => {
    try {
      await addDoc(collection(db, "menus"), {
        name,
        memo,
        weight,
        weightType,
        count,
        set,
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
      await updateDoc(doc(db, "menus", id), {
        name,
        memo,
        weight,
        weightType,
        count,
        set,
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
                <MenuNameInput name={name} onChangeName={onChangeName} />
                <MenuMemoInput memo={memo} onChangeMemo={onChangeMemo} />
                <MenuWeightInputs
                  weight={weight}
                  onChangeWeight={onChangeWeight}
                  setWeight={setWeight}
                  weightType={weightType}
                  setWeightType={setWeightType}
                />
                <MenuCountInputs
                  count={count}
                  onChangeCount={onChangeCount}
                  setCount={setCount}
                  set={set}
                  onChangeSet={onChangeSet}
                  setSet={setSet}
                />
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
