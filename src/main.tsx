import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherApp } from './WeatherApp';
import { BrowserRouter } from 'react-router-dom';
import "./Styles/index.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <WeatherApp />
        </BrowserRouter>
    </React.StrictMode>
);
