import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App';

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: 'white',
        },
        control: {
          border: '1px',
          borderColor: '#4A525C',
          borderRadius: '0.15rem',
          marginRight: '0.5rem'
        },
        label: {
          fontWeight: '600'
        }
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode> 
);