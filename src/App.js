import React from "react";
import Routes from "./Routes/index";
import './assets/scss/theme.scss';
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

fakeBackend();

function App() {
  return (
    <React.Fragment>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover
      />
      <Routes />
    </React.Fragment>
  );
}

export default App;
