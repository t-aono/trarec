import { VFC, memo, useState, useEffect, ChangeEvent } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Stack, FormControl, FormLabel, Input, ModalFooter, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Flex } from "@chakra-ui/react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { Menu } from "../../../types/menu";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";

type Props = {
  menu?: Menu | null;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
  getMenus: () => void;
}

export const MenuEditlModal: VFC<Props> = memo((props) => {
  const { menu, isOpen, onClose, isNew, getMenus } = props;
  const {showMessage} = useMessage();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState<number | null>(10);
  const [set, setSet] = useState<number | null>(3);
  const { db } = useFirebase();

  useEffect(() => {
    setId(menu?.id ?? '');
    setName(menu?.name ?? '');
  }, [menu]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    (count > 0) ? setCount(count) : setCount(null);
  }
  const onChangeSet = (e: ChangeEvent<HTMLInputElement>) => {
    const set = parseInt(e.target.value);
    (set > 0) ? setSet(set) : setSet(null);
  }

  const initForm = () => {
    setName("");
    setCount(10);
    setSet(3);
  }

  const onClickRegist = async () => {
    try {
      await addDoc(collection(db, "menus"), { name, count, set });
      initForm();
      showMessage({ title: 'メニューを追加しました。', status: 'success' });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getMenus();
  };

  const onClickUpdate = async() => {
    try {
      await setDoc(doc(db, "menus", id), { name, count, set });
      initForm();
      showMessage({ title: 'メニューを更新しました。', status: 'success' });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getMenus();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
      <ModalOverlay>
        <ModalContent pb={2}>
          <ModalHeader>メニュー{isNew ? '追加' : '編集'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>名称</FormLabel>
                <Input value={name} onChange={onChangeName} />
              </FormControl>
              <Flex>
                <FormControl mr={3}>
                  <FormLabel>回数</FormLabel>
                  <NumberInput value={count ? count : ""}>
                    <NumberInputField onChange={onChangeCount} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={() => count && setCount(count + 1)} />
                      <NumberDecrementStepper onClick={() => count && setCount(count - 1)} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl ml={3}>
                  <FormLabel>セット数</FormLabel>
                  <NumberInput value={set ? set : ""}>
                    <NumberInputField onChange={onChangeSet} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={() => set && setSet(set + 1)} />
                      <NumberDecrementStepper onClick={() => set && setSet(set - 1)} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {isNew ? <PrimaryButton onClick={onClickRegist}>登録</PrimaryButton> : (
              <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});