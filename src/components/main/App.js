import React from 'react';

import AppRouter from 'routers/AppRouter/AppRouter';
import { store } from 'store';
import { Provider } from 'react-redux';
import { AuthProvider } from 'context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'assets/ca_scss/cafeaddicted.scss';
import 'assets/ca_scss/main.css';
import 'styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from 'components/shared/ConfirmDeleteModal';
import { SignalRProvider } from 'context/SignalRContext';

const App = () => {
  return (
      <Provider store={store}>
        <SignalRProvider>
        <AuthProvider>
          <AppRouter />
          <ToastContainer />
          <ConfirmModal />
          <div id='ca_modal_root'></div>
        </AuthProvider>
        </SignalRProvider>
      </Provider>
  );
};
export default App;
