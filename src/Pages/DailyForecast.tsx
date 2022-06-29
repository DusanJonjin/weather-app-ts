import DayForecast from '../Components/DailyForecast/DayForecast';
import HourForecast from '../Components/- Shared -/HourForecast';
import { WeatherData } from '../Models/weather.data.models';
import { dayDate } from '../Utilities/helperFunctions';
import { useLocation } from 'react-router-dom';
import { messages } from '../Fixtures/miscData';

const DailyForecast = ({ weatherData }: { weatherData: WeatherData | null }) => {
    const { badHomeSearch, networkError, badDate } = messages;

    if (weatherData === null) return (
        <p>{badHomeSearch}</p>
    );

    const { city, country, timezone, hourly, daily } = weatherData;

    if (!daily || !hourly) return (
        <p className='message sad'>
            {networkError}
        </p>
    );

    const location = useLocation();

    const { pathname } = location;

    const clickedDateArray = pathname.match(/(?<=_).*/);
    //If there is a match, date exists:
    const clickedDate = clickedDateArray && clickedDateArray[0];

    //All dates from daily object in one array:
    const allDailyDatesArr = daily.data.map(day =>
        dayDate(day.time, {timeZone: timezone})
    );

    if (!clickedDate || !allDailyDatesArr.includes(clickedDate)) return (
        <p className='message'>
            {badDate}
        </p>
    );

    const chosenDay = daily.data.filter(
        day => dayDate(day.time, {timeZone: timezone}) === clickedDate
    )[0];

    const chosenDayHours = hourly.data.filter(
        hour => dayDate(hour.time, {timeZone: timezone}) === clickedDate
    );
    
    return (
        <section id='day-hour-forecast'>          
            <DayForecast chosenDay={chosenDay}
                         city={city}
                         country={country}
                         timezone={timezone}                      
            />
            <HourForecast chosenDayHours={chosenDayHours}
                          timezone={timezone}
            />           
        </section>
    );
}

export default DailyForecast;