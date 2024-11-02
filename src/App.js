import React, { useEffect } from "react";
import Routes from "./Routes/index";
import "./assets/scss/theme.scss";
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

fakeBackend();

function App() {

  useEffect(() => {
    // Create custom cursor element
    const cursorImage = document.createElement("div");
    cursorImage.classList.add("custom-cursor");
    document.body.appendChild(cursorImage);

    // Function to update position
    const moveCursor = (e) => {
      cursorImage.style.left = `${e.pageX}px`;
      cursorImage.style.top = `${e.pageY}px`;
    };
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursorImage);
    };
  }, []);
  
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
