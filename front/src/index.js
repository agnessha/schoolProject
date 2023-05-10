import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import { AuthProvider } from './context/auth';
import MouseContextProvider from "./context/mouse-context";
import {AppCon} from "./App";
import store from "./redux/store";
import {Provider} from "react-redux";


ReactDOM.render(
    <React.StrictMode>
        <div className="cursor"></div>
        <div className="aura"></div>
        <AuthProvider>
        <Router>
            <MouseContextProvider>
                <Provider store={store}>
                <AppCon />
                </Provider>
            </MouseContextProvider>
        </Router>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
