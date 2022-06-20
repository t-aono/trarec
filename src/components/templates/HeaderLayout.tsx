import { memo, ReactNode } from "react";

import { Header } from "../organisms/layout/Header";

type Props = {
  children: ReactNode;
};

export const HeaderLayout = memo((props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
