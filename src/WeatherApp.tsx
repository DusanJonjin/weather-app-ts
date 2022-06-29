import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import DailyForecast from './Pages/DailyForecast';
import { WeatherData } from './Models/weather.data.models';
import { getWeather } from './API/api';
import { messages } from './Fixtures/miscData';
import { useScrollToTop } from './Hooks/ScrollToTop';
import { Routes, Route } from 'react-router-dom';

export function WeatherApp() {

    const { 
        loading,
        searching,
        badUrlSearch,
        networkError,
        minLetters
    } = messages;

    const { pathname } = useScrollToTop();

    const isHomeUrl = pathname === '/';

    // Do this on first App mount and home URL or DailyForecast URL page refresh:
    const findCityFromUrl = (): string => {
        if (isHomeUrl) return 'belgrade';
        const requiredRoute = '/DailyForecast/';
        const requiredRouteLength = requiredRoute.length;
        const pathnameFirstPart = pathname.slice(0, requiredRouteLength);
        if (!pathnameFirstPart.includes(requiredRoute)) return '';
        const cityAndDatefromUrl = pathname.slice(requiredRouteLength);
        if(!cityAndDatefromUrl) return '';
        const underscoreArr = cityAndDatefromUrl.match(/_/g);
        if (!underscoreArr || underscoreArr.length > 1) return '';
        const city = cityAndDatefromUrl.slice(0, cityAndDatefromUrl.indexOf('_') + 1);
        return city;
    };

    const [status, setStatus] = useState<'isLoading' | 'error' | 'isLoaded'>('isLoading');

    const [searchValue, setSearchValue] = useState<string>(findCityFromUrl());

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [message, setMessage] = useState<string>(loading);

    const handleSearchSubmit = (
        e: React.FormEvent<HTMLFormElement>, 
        inputRef: React.MutableRefObject<HTMLInputElement | null>
        ): void => {
        e.preventDefault();
        if (inputRef === null) return;
        const currInputValue = inputRef.current!.value;
        if (searchValue === currInputValue) return;
        if (currInputValue.length < 2) {
            setStatus('error');
            setMessage(minLetters)
        }
        else {
        setStatus('isLoading')
        setWeatherData(null);
        setSearchValue(currInputValue);
        setMessage(searching);
        }
    }

    const handleErrorMsg = (message: string): void => {
        setMessage(message);
    }

    useEffect(() => {
        getWeather(searchValue, badUrlSearch, networkError, handleErrorMsg).then(res => 
            (setWeatherData(res), setStatus(res === null ? 'error' : 'isLoaded'))
        )
    }, [searchValue]);

    
    const msgClass = (message: string): string => {
        switch (message) {
            case loading: 
            case searching: 
                return 'happy';
            case badUrlSearch:
            case networkError:
            case minLetters:
                 return  'sad';
            default: return '';
        }
     };

    return (
        <>
            <Navbar handleSearchSubmit={handleSearchSubmit} />
            {{
                'isLoading': 
                    <div className={`message ${msgClass(message)}`}>
                        <p>{message}</p>
                    </div>,
                'error':
                    <div className={`message ${msgClass(message)}`}>
                        <p>{message}</p>
                    </div>,
                'isLoaded':
                    <main id='weather-app'>
                        <Routes>
                            <Route 
                                path='/' 
                                element={
                                    <Home weatherData={weatherData} 
                                        message={message}
                                    />
                                } 
                            />
                            <Route 
                                path='/DailyForecast/*' 
                                element={
                                    <DailyForecast weatherData={weatherData} />
                                } 
                            />
                            <Route 
                                path='*' 
                                element={<div>Bad URL!</div>} 
                            />
                        </Routes>
                    </main>
            }[status]}
            <footer>Weather Foreast App by D.J. &copy; {new Date().getFullYear()}</footer>
        </>
    );
}
