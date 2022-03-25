import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import CommonProvider from "./context/CommonContext";

ReactDOM.render(
  <CommonProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </CommonProvider>,
  document.getElementById("root")
);
