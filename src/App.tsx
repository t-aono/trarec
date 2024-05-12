import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Router } from "./router/Router";
import theme from "./theme/theme";
import { FirebaseProvider } from "./providers/FirebaseProvider";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FirebaseProvider>
    </ChakraProvider>
  );
}

export default App;
