// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './components/App.js';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
// import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes.js';
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(routes)
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router}/>);