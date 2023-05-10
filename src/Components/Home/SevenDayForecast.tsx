import  OneDayCard from './OneDayCard';
import { DayData } from '../../Models/weather.data.models';
import { LanguageCode, UnitCode } from '../../Models/app.data.models';
import { dayDate } from '../../Utilities/dateFunctions';
import { sevenDaysFcast } from '../../Fixtures/translation.objects';
import { Link } from 'react-router-dom';

interface SevenDayForecastProps {
    city: string;
    timezone: string;
    dailyData: DayData[];
    language: LanguageCode;
    units: UnitCode;
}

const SevenDayForecast = (props: SevenDayForecastProps) => {
    const { 
        city, 
        timezone, 
        dailyData, 
        language,
        units
    }= props;

    return (
        <section className='seven-day-forecast'>
            <h3>
                {sevenDaysFcast[language]}
            </h3>
            <ul>
                {dailyData.map(dayData => 
                    <li key={dayData.time}>
                        <Link 
                            to={{pathname:`/DailyForecast/${city + '_' + dayDate(dayData.time, {timeZone: timezone})}`}}
                            className='link'
                        >
                            <OneDayCard 
                                dayData={dayData} 
                                timezone={timezone} 
                                language={language}
                                units={units}
                            />
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    );
}

export default SevenDayForecast;