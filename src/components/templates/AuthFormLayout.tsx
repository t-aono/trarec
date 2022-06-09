import { VFC, memo, ReactNode, useState, ChangeEvent } from "react";
import { Redirect, useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {
  children: ReactNode;
};

export const AuthFormLayout: VFC<Props> = memo((props) => {
  const history = useHistory();
  const { children } = props;
  const { loginUser } = useLoginUser();
  const { login, guestLogin, signUp, loading } = useAuth();

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  const onClickLoginSignUp = () => (children === "Login" ? login(mail, pass) : signUp(mail, pass));
  const onClickGuestLogin = () => guestLogin();
  const onClickSignUpRedirect = () => history.push("/signup");
  const onClickLoginRedirect = () => history.push("/");

  return (
    <>
      {loginUser ? (
        <Redirect to="/home" />
      ) : (
        <Flex align="center" justify="center" height="100vh">
          <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">
              TRAREC
            </Heading>
            <Heading mt={3} size="md" textAlign="center">
              {children}
            </Heading>
            <Divider my={4} />
            <Stack spacing={6} py={4} px={18}>
              <Input placeholder="メールアドレス" value={mail} onChange={onChangeMail} />
              <Input type="password" placeholder="パスワード" value={pass} onChange={onChangePass} />
              <PrimaryButton onClick={onClickLoginSignUp} loading={loading} disabled={mail === "" && pass === ""}>
                {children === "Login" ? "ログイン" : "登録"}
              </PrimaryButton>
            </Stack>

            {children === "Login" ? (
              <Flex>
                <Link fontSize="sm" color="gray.400" onClick={onClickGuestLogin}>
                  ゲスト利用
                </Link>
                <Spacer />
                <Link fontSize="sm" color="gray.400" onClick={onClickSignUpRedirect}>
                  会員登録はこちら
                </Link>
              </Flex>
            ) : (
              <Flex justify="right">
                <Link fontSize="sm" color="gray.400" onClick={onClickLoginRedirect}>
                  ログインはこちら
                </Link>
              </Flex>
            )}
          </Box>
        </Flex>
      )}
    </>
  );
});
