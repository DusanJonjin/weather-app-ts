import { useEffect, useState } from 'react';
import Header from './Components/Header';
import AsideMenu from './Components/Aside Menu/AsideMenu';
import AppFlow from './AppFlow';
import { WeatherData } from './Models/weather.data.models';
import { BasicData, LanguageCode, UnitCode } from './Models/app.data.models';
import { getWeather } from './API/api';
import { messages } from './Fixtures/miscData';
import { useScrollToTop } from './Hooks/useScrollToTop';
import { useBookmarks } from './Hooks/useBookmarks';
import { findCityFromStorageOrUrl } from './Utilities/helperFunctions';
import { useLocation } from 'react-router-dom';

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

const AppMessage = ({ message }: { message: string }) => {
    return (
        <div className={`message ${addMessageClass(message)}`}>
            <p>{message}</p>
        </div>
    );
};

export function WeatherApp() {

    const { pathname } = useLocation();
    const { bookmarks, city, toggleCity } = useBookmarks();

    const [status, setStatus] = useState<'isLoading' | 'error' | 'isLoaded'>('isLoading');
    // Passed function to useState will be executed only on the initial render:
    const [basicData, setBasicData] = useState<BasicData>(() => findCityFromStorageOrUrl(pathname));
    const { searchedCity, units, language } = basicData;
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [message, setMessage] = useState<string>(loading);
    const [showAsideMenu, setShowAsideMenu] = useState<boolean>(false);

    useScrollToTop(pathname, showAsideMenu);
 
    const toggleAsideMenu = () => {
        setShowAsideMenu(prevAside => !prevAside);
    };

    const openAsideMenu = () => {
        setShowAsideMenu(true);
    }

    const handleSettingsChange = () => {
        setStatus('isLoading');
        setWeatherData(null);
        setMessage(settingsChange);
        setShowAsideMenu(false);
    };

    const handleLanguageChange = (language: LanguageCode) => {
        handleSettingsChange();
        setBasicData(prevBData => ({...prevBData, language}));
    };

    const handleUnitsChange = (units: UnitCode) => {
        handleSettingsChange();
        setBasicData(prevBData => ({...prevBData, units}));
    }

    const handleCityChange = (newCity: string) => {
        if (searchedCity === newCity) return;
        setStatus('isLoading')
        setWeatherData(null);
        setBasicData(prevBData => ({...prevBData, searchedCity: newCity, id: ""}));
        setMessage(searching);
        setShowAsideMenu(false);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, inputValue: string) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        if (inputValue.length < 2) {
            setStatus('error');
            setMessage(minLetters)
        } else {
            handleCityChange(inputValue)
        }
    };

    const handleErrorMsg = (message: string) => {
        setMessage(message);
    };

    useEffect(() => {
        getWeather(basicData, badUrlSearch, networkError, handleErrorMsg).then(res => 
            (setWeatherData(res), setStatus(res === null ? 'error' : 'isLoaded'))
        )
    }, [searchedCity, units, language]);

    useEffect(() => {
        document.body.classList.toggle("aside-menu-open", showAsideMenu);
    }, [showAsideMenu])

    return (
        <>
            <Header 
                handleSearchSubmit={handleSearchSubmit}
                toggleAsideMenu={toggleAsideMenu}
                showAsideMenu={showAsideMenu}
                language={language}
            />
            <main className={`weather-app`}>
                <AsideMenu 
                    showAsideMenu={showAsideMenu}
                    handleCityChange={handleCityChange}
                    bookmarks={bookmarks}
                    toggleCity={toggleCity}
                    basicData={basicData}
                    handleLanguageChange={handleLanguageChange}
                    handleUnitsChange={handleUnitsChange}
                    city={city}
                />
                {{
                    isLoading: 
                        <AppMessage message={message} />,
                    error:
                        <AppMessage message={message} />,
                    isLoaded:
                        <AppFlow
                            weatherData={weatherData} 
                            badHomeSearch={badHomeSearch}
                            bookmarks={bookmarks}
                            language={language}
                            units={units}
                            toggleCity={toggleCity}
                            openAsideMenu={openAsideMenu}
                        />
                }[status]}
            </main>
            <footer>
                    <p>Powered by Pirate Weather's API</p>
                    <p><span>Weather Forecast</span>&ensp;by D.J. &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    );
}
