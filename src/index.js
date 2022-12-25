import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyle from '~/layout/component/GlobalStyle';
import { SnackbarProvider } from 'notistack';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
<SnackbarProvider maxSnack={3} autoHideDuration={3000} preventDuplicate>
    
      <GlobalStyle>
          <App />
      </GlobalStyle>
      </SnackbarProvider>
  </React.Fragment>,
);

