import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {createBrowserHistory} from "history";
import "./main-style.css"
import UserContext, {UserProvider} from "./context/UserContext";



const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
          <App/>
      </UserProvider>
  </React.StrictMode>
);

