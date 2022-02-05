import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { VFC } from "react";
import { Menu } from "../../../types/menu";

type Props = {
  menus: Menu[];
  setTargetMenu: (value: string) => void;
};

export const MenuSelect: VFC<Props> = (props) => {
  const { menus, setTargetMenu } = props;

  const onChangeMenu = (value: string) => {
    const selectedMenu = menus.find((menu) => menu.id === value);
    if (selectedMenu) {
      setTargetMenu(selectedMenu.id);
    } else {
      setTargetMenu("");
    }
  };

  return (
    <Box px={2} w={{ base: "100%", md: "md" }}>
      <FormControl>
        <FormLabel fontSize="sm" wordBreak="keep-all">
          メニュー
        </FormLabel>
        <Select onChange={(e) => onChangeMenu(e.target.value)}>
          <option></option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
