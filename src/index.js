import React from 'react';
import ReactDOM from 'react-dom/client';
import Skeleton from './components/skeleton';
import { BrowserRouter } from 'react-router-dom';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './css/style.css';
import './css/style2.css';
import './css/menu.css';
import './css/fontawesome.min.css';
import './css/responsive.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Skeleton />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
