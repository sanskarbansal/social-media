import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import App from "./components/App";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
