import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import CommonProvider from "./context/CommonContext";
import store from "./store/store";

ReactDOM.render(
  <CommonProvider>
    <AuthProvider>
      <Provider store={store}>

        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </AuthProvider>
  </CommonProvider>,
  document.getElementById("root"),
);
