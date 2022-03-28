import { getAuth } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import CommonProvider from "./context/CommonContext";
import { app } from "./firebase";
import store from "./store/store";

ReactDOM.render(
  <CommonProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </CommonProvider>,
  document.getElementById("root"),
);
