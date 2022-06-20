import { useContext } from "react";
import { MenusContextType, MenusContext } from "../providers/MenusProvider";

export const useMenus = (): MenusContextType => useContext(MenusContext);
