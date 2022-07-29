import { ReactNode, memo, useEffect, useState } from "react";
import { Box, Center, VStack } from "@chakra-ui/layout";

export const NetworkConnectedGuard = memo((props: { children: ReactNode }) => {
  const { children } = props;

  const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;

  const useNavigatorOnLine = () => {
    const [status, setStatus] = useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    useEffect(() => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);

      return () => {
        window.removeEventListener("online", setOnline);
        window.removeEventListener("offline", setOffline);
      };
    }, []);

    return status;
  };

  if (useNavigatorOnLine()) {
    return <>{children}</>;
  } else {
    return (
      <Center height="80vh">
        <VStack spacing={3}>
          <Box>
            <img src={`${process.env.PUBLIC_URL}/offline.jpg`} alt="offline_image" />
          </Box>
          <Box>オフラインです。</Box>
          <Box>ネットワーク接続を確認してください。</Box>
        </VStack>
      </Center>
    );
  }
});
