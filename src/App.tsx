import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Router } from './router/Router';
import theme from './theme/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router/>  
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
