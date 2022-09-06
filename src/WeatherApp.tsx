import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Home from './Pages/Home';
import DailyForecast from './Pages/DailyForecast';
import AsideMenu from './Components/Aside Menu/AsideMenu';
import { WeatherData } from './Models/weather.data.models';
import { getWeather } from './API/api';
import { messages } from './Fixtures/miscData';
import { useScrollToTop } from './Hooks/ScrollToTop';
import { useBookmarks } from './Hooks/useBookmarks';
import { findCityFromStorageOrUrl } from './Utilities/helperFunctions';
import { Routes, Route } from 'react-router-dom';

const { 
    loading,
    searching,
    badHomeSearch,
    badUrlSearch,
    networkError,
    minLetters,
    settingsChange
} = messages;

const addMessageClass = (message: string): string => {
    switch (message) {
        case loading: 
        case searching:
        case settingsChange:
            return 'happy';
        case badUrlSearch:
        case networkError:
        case minLetters:
             return  'sad';
        default: return '';
    }
};

export interface BasicData {
    searchedCity: string,
    id: string;
    units: string;
    language: string;
}

export function WeatherApp() {
    const { pathname } = useScrollToTop();

    const { bookmarks, city, toggleCity } = useBookmarks();

    const [status, setStatus] = useState<'isLoading' | 'error' | 'isLoaded'>('isLoading');

    // Passed function to useState will be executed only on the initial render:
    const [basicData, setBasicData] = useState<BasicData>(() => findCityFromStorageOrUrl(pathname));

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [message, setMessage] = useState<string>(loading);

    const [showAsideMenu, setShowAsideMenu] = useState<boolean>(false);

    const { searchedCity, units, language } = basicData;
 
    const toggleAsideMenu = (): void => {
        setShowAsideMenu(prevAside => !prevAside);
    };

    const openAsideMenu = (): void => {
        setShowAsideMenu(true);
    }

    const handleLangUnitsChange = (settingsName: string, newCode: string) => {
        if (units === newCode || language === newCode) return;
        setStatus('isLoading');
        setWeatherData(null);
        setBasicData(prevBData => settingsName === "units" 
            ? ({...prevBData, units: newCode}) 
            : ({...prevBData, language: newCode})
        );
        setMessage(settingsChange);
        setShowAsideMenu(false);
    }

    const handleNewCity = (newCity: string): void => {
        if (searchedCity === newCity) return;
        setStatus('isLoading')
        setWeatherData(null);
        setBasicData(prevBData => ({...prevBData, searchedCity: newCity, id: ""}));
        setMessage(searching);
        setShowAsideMenu(false);
    };

    const handleSearchSubmit = (
        e: React.FormEvent<HTMLFormElement>, 
        inputRef: React.MutableRefObject<HTMLInputElement | null>
        ): void => {
        e.preventDefault();
        if (inputRef === null) return;
        const searchValue = inputRef.current!.value;
        if (searchValue.length < 1) return;
        if (searchValue.length < 2) {
            setStatus('error');
            setMessage(minLetters)
        }
        else {
            handleNewCity(searchValue)
        }
    };

    const handleErrorMsg = (message: string): void => {
        setMessage(message);
    };

    useEffect(() => {
        getWeather(basicData, badUrlSearch, networkError, handleErrorMsg).then(res => 
            (setWeatherData(res), setStatus(res === null ? 'error' : 'isLoaded'))
        )
    }, [searchedCity, units, language]);

    return (
        <>
            <Header handleSearchSubmit={handleSearchSubmit}
                toggleAsideMenu={toggleAsideMenu}
                showAsideMenu={showAsideMenu}
            />
            <main id='weather-app'>
                <AsideMenu showAsideMenu={showAsideMenu}
                    handleNewCity={handleNewCity}
                    bookmarks={bookmarks}
                    toggleCity={toggleCity}
                    basicData={basicData}
                    handleLangUnitsChange={handleLangUnitsChange}
                    city={city}
                />
                {{
                    'isLoading': 
                        <div className={`message ${addMessageClass(message)}`}>
                            <p>{message}</p>
                        </div>,
                    'error':
                        <div className={`message ${addMessageClass(message)}`}>
                            <p>{message}</p>
                        </div>,
                    'isLoaded':
                        <>
                            <Routes>
                                <Route 
                                    path='/' 
                                    element={
                                        <Home weatherData={weatherData} 
                                            message={badHomeSearch}
                                            toggleCity={toggleCity}
                                            bookmarks={bookmarks}
                                            openAsideMenu={openAsideMenu}
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
                        </>
                }[status]}
            </main>
            <footer>
                    <p>Powered by Dark Sky's API</p>
                    <p><span>Weather Forecast</span> by D.J. &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    );
}
