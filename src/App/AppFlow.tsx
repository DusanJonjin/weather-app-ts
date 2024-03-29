import Home from '../Pages/Home';
import DailyForecast from '../Pages/DailyForecast';
import { WeatherData } from '../Models/weather.data.models';
import { LanguageCode, UnitCode } from '../Models/app.data.models';
import { CityNameID } from '../Hooks/useBookmarks';
import { Routes, Route } from 'react-router-dom';

export interface AppFlowProps {
    weatherData: WeatherData | null;
    badHomeSearch: string;
    bookmarks: CityNameID[];
    language: LanguageCode;
    units: UnitCode;
    openAsideMenu: () => void;
    toggleCity: (name: string, id: string) => void;
}

const AppFlow = (props: AppFlowProps) => {
    const {
        weatherData,
        language,
        units,
    } = props;

    return (
        <>
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Home {...props} />
                    } 
                />
                <Route 
                    path='/DailyForecast/*' 
                    element={
                        <DailyForecast 
                            weatherData={weatherData}
                            language={language}
                            units={units}
                        />
                    } 
                />
                <Route 
                    path='*' 
                    element={<div>Bad URL!</div>} 
                />
            </Routes>
        </>
    );
}

export default AppFlow;
