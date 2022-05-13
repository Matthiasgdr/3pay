import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { UserContextProvider } from "./hooks/useUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <MoralisProvider
        appId={process.env.REACT_APP_ID}
        serverUrl={process.env.REACT_APP_SERVER_URL}
      >
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </UserContextProvider>
      </MoralisProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
