import {
    CityCountry, 
    Day, 
    FullDate, 
    Year,
    Image, 
    OtherWeatherDetails,
    HourForecast
} from '../- Shared -/AllSharedComponents';
import { Currently, HourData } from "../../Models/weather.data.models";
import { dateObj } from '../../Utilities/helperFunctions';

interface CurrentWeatherProps {
    city: string,
    country: string,
    timezone: string,
    currently: Currently,
    currHourForecast: HourData[],
}

const CurrentWeather = ({ city, country, timezone, currently, currHourForecast }: CurrentWeatherProps) => {

    const { 
        time,
        icon,
        summary,
        temperature,
        pressure,
        humidity,
        windSpeed,
        uvIndex 
    } = currently;

    const { day, date, year, localTime } = dateObj(time, timezone);

    return (
        <section className='current-weather'>
            <CityCountry city={city}
                country={country}
            />
            <p className='date-and-year'>
                <Day day={day} />,&nbsp;
                <FullDate fullDate={date} />&nbsp;
                <Year year={year} /> at &nbsp;
                <span>{localTime + 'h'}</span>
            </p>
            <div className='current-wrapper'>
                <div className='image-wrapper'>
                    <Image imgSrc={`/Images/${icon}.png`}
                        imgAlt={icon} 
                    />
                </div>
                <div className='temp-summary-wrapper'>
                    <p id='temp-now'>
                        {temperature.toFixed(1)}<sup>°C</sup>
                    </p>
                    <p className='current-summary'>{summary}</p>
                </div>
                <OtherWeatherDetails pressure={pressure} 
                    humidity={humidity} 
                    windSpeed={windSpeed} 
                    uvIndex={uvIndex}
                />
            </div>
            <HourForecast chosenDayHours={currHourForecast} timezone={timezone} />
        </section>
    );
}

export default CurrentWeather;