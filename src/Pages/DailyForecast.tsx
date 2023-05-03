import { useMemo } from 'react';
import DayForecast from '../Components/DailyForecast/DayForecast';
import HourForecast from '../Components/- Shared -/HourForecast';
import Pagination from '../Components/DailyForecast/Pagination';
import { WeatherData } from '../Models/weather.data.models';
import { Languages, Units } from '../Models/app.data.models';
import { dayDate, dateObj } from '../Utilities/dateFunctions';
import { useLocation } from 'react-router-dom';
import { messages } from '../Fixtures/miscData';

interface DailyForecastProps {
    weatherData: WeatherData | null;
    language: Languages;
    units: Units;
}

const DailyForecast = (props: DailyForecastProps) => {
    const { weatherData, language, units } = props;

    const { badHomeSearch, networkError, badDate } = messages;

    const { pathname } =  useLocation();

    if (weatherData === null) return (
        <div className={`message sad`}>
            <p>{badHomeSearch}</p>
        </div>
    );

    const { city, country, timezone, hourly, daily } = weatherData;

    if (!daily || !hourly) return (
        <p className='message sad'>
            {networkError}
        </p>
    );

    const clickedDateArray = pathname.match(/(?<=_).*/);
    //If there is a match, date exists:
    const clickedDate = clickedDateArray ? clickedDateArray[0] : '';

    //All dates from daily object in one array:
    const allDailyDatesArr = daily.data.map(day => {
        const fullDate = dayDate(day.time, {timeZone: timezone});
        const dateObject = dateObj(day.time, language, timezone);
        return {...dateObject, fullDate}
    });

    if (!clickedDate || !allDailyDatesArr.some(dateObj => dateObj.fullDate === clickedDate)) return (
        <p className='message sad'>
            {badDate}
        </p>
    );

    const chosenDay = useMemo(() => daily.data.filter(
        day => dayDate(day.time, {timeZone: timezone}) === clickedDate
    ), [clickedDate])[0];

    const chosenDayHours = useMemo(() => 
        hourly.data.filter(hour => 
            dayDate(hour.time, {timeZone: timezone}) === clickedDate
        ),[clickedDate]
    );
    
    return (
        <article id='daily-forecast'> 
            <div className='forecast-wrapper'>        
                <DayForecast chosenDay={chosenDay}
                    city={city}
                    country={country}
                    timezone={timezone} 
                    language={language}
                    units={units}                  
                />
                <HourForecast chosenDayHours={chosenDayHours}
                    timezone={timezone}
                    language={language}
                    units={units}
                /> 
                <Pagination clickedDate={clickedDate}
                    allDailyDatesArr={allDailyDatesArr}
                    city={city}
                />
            </div>          
        </article>
    );
}

export default DailyForecast;