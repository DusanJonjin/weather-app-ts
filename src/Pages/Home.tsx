import { useMemo } from 'react';
import CurrentWeather from '../Components/Home/CurrentWeather';
import SevenDayForecast from '../Components/Home/SevenDayForecast';
import { WeatherData, HourData, DayData } from '../Models/weather.data.models';
import { Languages, Units } from '../Models/app.data.models';
import { CityNameID } from '../Hooks/useBookmarks';
import { dayDate } from '../Utilities/dateFunctions';

interface HomeProps {
    weatherData: WeatherData | null;
    message: string;
    toggleCity: (name: string, id:string) => void;
    bookmarks: CityNameID[];
    openAsideMenu: () => void;
    language: Languages;
    units: Units;
}

const Home = (props: HomeProps) => {
    
    const { 
        weatherData, 
        message, 
        toggleCity, 
        bookmarks,
        openAsideMenu,
        language,
        units
    } = props;

    if (weatherData === null) return (
        <div className={`message sad`}>
            <p>{message}</p>
        </div>
    );

    const { 
        cityID,
        city,
        country,
        timezone,
        currently,
        hourly,
        daily
    } = weatherData;

    const currentDate: string = dayDate(currently.time, {timeZone: timezone});

    const currHourForecast: HourData[] = useMemo(() => 
        hourly.data.filter((hourFcast: HourData) => 
            dayDate(hourFcast.time, {timeZone: timezone}) === currentDate), 
        [currentDate]
    );

    const dailyData: DayData[] = useMemo(() => 
        daily.data.filter((dailyFcast: DayData) => 
            dayDate(dailyFcast.time, {timeZone: timezone}) !== currentDate), 
        [currentDate]
    );
    
    return (
        <article id='weather-forecast-home'>
            <div className='forecast-wrapper'>
                <CurrentWeather cityID={cityID}
                    city={city}
                    country={country}
                    timezone={timezone}
                    currently={currently}
                    currHourForecast={currHourForecast} 
                    toggleCity={toggleCity}
                    bookmarks={bookmarks}
                    openAsideMenu={openAsideMenu}
                    language={language}
                    units={units}
                />
                <SevenDayForecast city={city}
                    timezone={timezone}
                    dailyData={dailyData} 
                    language={language}
                    units={units}
                />
            </div>
        </article>
    );
}

export default Home;