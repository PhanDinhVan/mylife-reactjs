import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
// toastr of register
import { ToastContainer } from 'react-toastify';

import { store, persistor } from './stores';
import App from './App';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <ToastContainer />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
