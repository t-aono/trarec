import { VFC, memo } from "react";

import { AuthFormLayout } from "../templates/AuthFormLayout";

export const Login: VFC = memo(() => {
  return (
    <>
      <AuthFormLayout>Login</AuthFormLayout>
    </>
  );
});
