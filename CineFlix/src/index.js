import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "./store";
import { Analytics } from '@vercel/analytics/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>

      <Router>

        <App />
        <Analytics/>

      </Router>

    </Provider>
  // </React.StrictMode>
);
