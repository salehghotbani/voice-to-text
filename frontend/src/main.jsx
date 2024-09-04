import {ColorModeScript, CSSReset} from '@chakra-ui/react';
import * as React from 'react'
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import theme from './theme';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './store/store'
import {registerSW} from "virtual:pwa-register";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CSSReset/>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <App/>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

registerSW({immediate: true});
