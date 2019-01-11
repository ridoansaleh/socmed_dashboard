import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./pages/App.js";
import createStore from './redux/store';

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);