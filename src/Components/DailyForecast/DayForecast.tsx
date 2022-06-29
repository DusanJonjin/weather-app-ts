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
import { dateObj } from '../../Utilities/helperFunctions';

interface DayForecastProps {
    chosenDay: DayData,
    city: string,
    country: string,
    timezone: string,
}

const DayForecast = ({ chosenDay, city, country, timezone }: DayForecastProps) => {

    const { time,
            summary,
            icon,
            temperatureMin,
            temperatureMax,
            pressure,
            humidity,
            windSpeed,
            uvIndex
    } = chosenDay;

    const {day, date, year} = dateObj(time, timezone);


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
                />
                <OtherWeatherDetails pressure={pressure} 
                    humidity={humidity} 
                    windSpeed={windSpeed} 
                    uvIndex={uvIndex}
                />
            </div>
        </section>
    );
}

export default DayForecast;