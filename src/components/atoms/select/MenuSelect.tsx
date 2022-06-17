import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { HistoryMenu } from "../../../types/menu";

type Props = {
  menus: HistoryMenu[];
  selectMenu: (menu: HistoryMenu) => void;
  setLineData: () => void;
};

export const MenuSelect = (props: Props) => {
  const { menus, selectMenu, setLineData } = props;

  const onChangeMenu = (value: string) => {
    const selectedMenu = menus.find((menu) => menu.id === value);
    selectMenu(selectedMenu!);
    setLineData();
  };

  return (
    <FormControl>
      <FormLabel fontSize="sm">メニュー</FormLabel>
      <Select onChange={(e) => onChangeMenu(e.target.value)}>
        {menus.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
