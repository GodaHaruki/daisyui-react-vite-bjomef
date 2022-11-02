import React from "react";
import ReactDOM from "react-dom";
import {
  Routes,
  Route,
  HashRouter,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import App from "./components/App.jsx";
// import { registerSW } from "virtual:pwa-register";
import "./App.css";
import Home from "./components/Home.jsx";
import { AsyncCookieProvider } from "./components/Cookie.jsx";
import Join from "./components/Join.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AsyncCookieProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
          <Route path="/join" element={<Join />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </AsyncCookieProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// registerSW();
