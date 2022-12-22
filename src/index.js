import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
