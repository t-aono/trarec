import { VFC, memo, useState, ChangeEvent } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Stack, Input, Heading, Divider, Box, Flex, Link } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";


export const Login: VFC = memo(() => {
  const history = useHistory();
  const { login, loading } = useAuth();
  const { loginUser } = useLoginUser();

  const onClickLogin = () => login(mail, pass);

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value);
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  const onClickSignUp = () => history.push("/signup");

  return (
    <>
      {loginUser ? <Redirect to="/home" /> : (
        <Flex align="center" justify="center" height="100vh">
          <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">React Sample App</Heading>
            <Heading mt={3} size="md" textAlign="center">Login</Heading>
            <Divider my={4} />
            <Stack spacing={6} py={4} px={18}>
              <Input placeholder="メールアドレス" value={mail} onChange={onChangeMail} />
              <Input type="password" placeholder="パスワード" value={pass} onChange={onChangePass} />
              <PrimaryButton onClick={onClickLogin} loading={loading} disabled={mail === '' && pass === ''}>ログイン</PrimaryButton>
            </Stack>
            <Flex justify="right">
              <Link fontSize="sm" color="gray.400" onClick={onClickSignUp}>会員登録はこちら</Link>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
});