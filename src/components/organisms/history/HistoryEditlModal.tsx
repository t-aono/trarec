import React, { VFC, memo, useState, useEffect, ChangeEvent } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Stack, FormControl, FormLabel, Input, ModalFooter, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Flex, Select } from "@chakra-ui/react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useFirebase } from "../../../hooks/useFirebase";
import { useAllMenus } from "../../../hooks/useAllMenus";
import { History } from "../../../types/history";

type Props = {
  history: History | null;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
  getHistories: (month: string) => void;
  month: string;
}

export const HistoryEditlModal: VFC<Props> = memo((props) => {
  const { history, isOpen, onClose, isNew, getHistories, month } = props;
  const { showMessage } = useMessage();
  const { getMenus, menus } = useAllMenus();
  const { db } = useFirebase();
  
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  const [menuId, setMenuId] = useState<string>("");
  const [count, setCount] = useState<number | null>(10);
  const [set, setSet] = useState<number | null>(3);

  useEffect(() => {
    getMenus();
    if (history) {
      setId(history.id);
      setDate(new Date(month + '-' + history.date));
      setMenuId(history.menuId);
      setCount(history.count);
      setSet(history.set);
    }
  }, [history, getMenus, month]);

  const onChangeMenu = (value: string) => {
    const selectedMenu = menus.find(menu => menu.id === value);
    if (selectedMenu) {
      setMenuId(selectedMenu.id);
      setCount(selectedMenu.count);
      setSet(selectedMenu.set);
    }
  }

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value));
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    (count > 0) ? setCount(count) : setCount(null);
  }
  const onChangeSet = (e: ChangeEvent<HTMLInputElement>) => {
    const set = parseInt(e.target.value);
    (set > 0) ? setSet(set) : setSet(null);
  }

  const initForm = () => {
    setMenuId("");
    setCount(10);
    setSet(3);
  }

  const onClickRegist = async() => {
    try {
      await addDoc(collection(db, "histories"), {
        date,
        menuId: menuId ? menuId : menus[0].id,
        count,
        set
      });
      initForm();
      showMessage({ title: '記録しました。', status: 'success' });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getHistories(month);
  };

  const onClickUpdate = async() => {
    try {
      await setDoc(doc(db, "histories", id), { date, menuId, count, set });
      initForm();
      showMessage({ title: '更新しました。', status: 'success' });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
    getHistories(month);
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
                <FormLabel>日付</FormLabel>
                <Input type="date" value={`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`} onChange={onChangeDate} />
              </FormControl>
              <FormControl>
                <FormLabel>メニュー</FormLabel>
                <Select onChange={(e) => onChangeMenu(e.target.value)} value={menuId}>
                  {menus.map((menu) => (
                    <option key={menu.id} value={menu.id}>{ menu.name }</option>
                  ))}
                </Select>
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