import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherApp } from './App/WeatherApp';
import { BrowserRouter } from 'react-router-dom';
import "./Styles/index.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <WeatherApp />
        </BrowserRouter>
    </React.StrictMode>
);
