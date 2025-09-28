import { useMemo } from 'react';
import { Message } from '../Components/- Shared -/SmallUiParts';
import DayForecast from '../Components/DailyForecast/DayForecast';
import { HourForecast } from '../Components/- Shared -/HourForecast';
import Pagination from '../Components/DailyForecast/Pagination';
import { AppFlowProps } from '../App/AppFlow';
import { dayDate, dateObj } from '../Utilities/dateFunctions';
import { useLocation } from 'react-router-dom';
import { messages } from '../Fixtures/translation.objects';

type DailyForecastProps = Pick<AppFlowProps, "weatherData" | "language" | "units">;

const DailyForecast = (props: DailyForecastProps) => {
    const { weatherData, language, units } = props;
    const { pathname } =  useLocation();
    const { badHomeSearch, networkError, badDate } = messages;

    if (weatherData === null) return (
        <Message 
            message={badHomeSearch[language]} 
            language={language}
        />
    );

    const { city, country, timezone, hourly, daily } = weatherData;

    if (!daily || !hourly) return (
        <Message
            message={networkError[language]}
            language={language}
        />
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
        <Message 
            message={badDate[language]} 
            language={language}
        />
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
                <DayForecast 
                    chosenDay={chosenDay}
                    city={city}
                    country={country}
                    timezone={timezone} 
                    language={language}
                    units={units}                  
                />
                <HourForecast 
                    chosenDayHours={chosenDayHours}
                    timezone={timezone}
                    language={language}
                    units={units}
                /> 
                <Pagination 
                    clickedDate={clickedDate}
                    allDailyDatesArr={allDailyDatesArr}
                    city={city}
                />
            </div>          
        </article>
    );
}

export default DailyForecast;