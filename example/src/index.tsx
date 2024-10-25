import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ModalContainer } from 'react-modal-pop';

import 'react-modal-pop/dist/index.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />

    <ModalContainer animation={{ duration: 200 }} />
  </React.StrictMode>
); 