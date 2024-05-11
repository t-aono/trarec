import { memo, ReactNode } from "react";
import { Button } from "@chakra-ui/button";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton = memo((props: Props) => {
  const { children, onClick, disabled = false, loading = false } = props;
  return (
    <Button bg="cyan.400" color="white" _hover={{ opacity: 0.8 }} isLoading={loading} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
});
