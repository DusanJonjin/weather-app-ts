import { useEffect, useState } from 'react';
import AsideMenu from '../Components/Aside Menu/AsideMenu';
import AppFlow from './AppFlow';
import Message from '../Components/- Shared -/Message';
import { AppLayout } from './AppLayout';
import { WeatherData } from '../Models/weather.data.models';
import { BasicData, LanguageCode, UnitCode } from '../Models/app.data.models';
import { getWeather } from '../API/api';
import { messages } from '../Fixtures/translation.objects';
import { useScrollToTop } from '../Hooks/useScrollToTop';
import { useBookmarks } from '../Hooks/useBookmarks';
import { getDataFromStorageOrUrl } from '../Utilities/helperFunctions';
import { useLocation } from 'react-router-dom';

export function WeatherApp() {
    const { 
        loading,
        searching,
        badHomeSearch,
        badUrlSearch,
        networkError,
        minLetters,
        settingsChange
    } = messages;
    const { pathname } = useLocation();
    const { bookmarks, city, toggleCity } = useBookmarks();

    const [status, setStatus] = useState<'isLoading' | 'error' | 'isLoaded'>('isLoading');
    // Passed function to useState will be executed only on the initial render:
    const [basicData, setBasicData] = useState<BasicData>(() => getDataFromStorageOrUrl(pathname));
    const { searchedCity, units, language } = basicData;
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [message, setMessage] = useState<string>(loading[language]);
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
        setMessage(settingsChange[language]);
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
        setMessage(searching[language]);
        setShowAsideMenu(false);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, inputValue: string) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        if (inputValue.length < 2) {
            setStatus('error');
            setMessage(minLetters[language])
        } else {
            handleCityChange(inputValue)
        }
    };

    const handleErrorMsg = (message: string) => {
        setMessage(message);
    };

    useEffect(() => {
        getWeather(basicData, badUrlSearch[language], networkError[language], handleErrorMsg)
        .then(res => {
            setWeatherData(res);
            setStatus(res === null ? 'error' : 'isLoaded');
        });
    }, [searchedCity, units, language]);

    useEffect(() => {
        document.body.classList.toggle("aside-menu-open", showAsideMenu);
    }, [showAsideMenu])

    return (
        <>
            <AppLayout
                handleSearchSubmit={handleSearchSubmit}
                toggleAsideMenu={toggleAsideMenu}
                showAsideMenu={showAsideMenu}
                language={language}
            >
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
                        <Message 
                            message={message} 
                            language={language}
                        />,
                    error:
                        <Message 
                            message={message}
                            language={language}
                        />,
                    isLoaded:
                        <AppFlow
                            weatherData={weatherData} 
                            badHomeSearch={badHomeSearch[language]}
                            bookmarks={bookmarks}
                            language={language}
                            units={units}
                            toggleCity={toggleCity}
                            openAsideMenu={openAsideMenu}
                        />,
                }[status]}
            </AppLayout>
        </>
    );
}
