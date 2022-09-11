import { 
    CityCountry, 
    Day, 
    FullDate, 
    Year,
    Image, 
    TempLowHigh,
    OtherWeatherDetails
} from '../- Shared -/AllSharedComponents';
import { DayData } from '../../Models/weather.data.models';
import { Languages, Units } from '../../Models/app.data.models';
import { dateObj } from '../../Utilities/dateFunctions';

interface DayForecastProps {
    chosenDay: DayData;
    city: string;
    country: string;
    timezone: string;
    language: Languages;
    units: Units;
}

const DayForecast = (props: DayForecastProps) => {
    const { 
        chosenDay,
        city,
        country,
        timezone,
        language,
        units
     } = props;

    const { time,
            summary,
            icon,
            temperatureMin,
            temperatureMax,
            ...otherDetails
    } = chosenDay;

    const {day, date, year} = dateObj(time, language, timezone);


    return (
        <section id='day-forecast'>
            <CityCountry city={city} 
                         country={country}
            />
            <p className='date-and-year'>
                <Day day={day} />,&nbsp;
                <FullDate fullDate={date} />&nbsp;
                <Year year={year}/>
            </p>
            <p id='summary'>{summary}</p>
            <div className='day-wrapper'>
                <div className='image-wrapper'>
                    <Image imgSrc={`/Images/${icon}.png`}
                        imgAlt={icon}
                    />
                </div>
                <TempLowHigh tempLow={temperatureMin.toFixed(1)}
                    tempHigh={temperatureMax.toFixed(1)}
                    dayPage={true}
                    language={language}
                    units={units}
                />
                <OtherWeatherDetails { ...otherDetails }
                    language={language}
                    units={units}
                 />
            </div>
        </section>
    );
}

export default DayForecast;