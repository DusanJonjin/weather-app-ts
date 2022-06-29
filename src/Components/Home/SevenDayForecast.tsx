import  OneDayCard from './OneDayCard';
import { DayData } from '../../Models/weather.data.models';
import { dayDate } from '../../Utilities/helperFunctions';
import { Link } from 'react-router-dom';

interface SevenDayForecastProps {
    city: string,
    timezone: string,
    dailyData: DayData[]
}

const SevenDayForecast = ({ city, timezone, dailyData }: SevenDayForecastProps) => {

    return (
        <section className='seven-day-forecast'>
            <h3>
                7-day forecast
            </h3>
            <ul>
                {dailyData.map(dayData => 
                    <li key={dayData.time}>
                        <Link 
                            to={{pathname:`/DailyForecast/${city + '_' + dayDate(dayData.time, {timeZone: timezone})}`}}
                            className='link'
                        >
                            <OneDayCard dayData={dayData} timezone={timezone} />
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    );
}

export default SevenDayForecast;