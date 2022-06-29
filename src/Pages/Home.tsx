import CurrentWeather from '../Components/Home/CurrentWeather';
import SevenDayForecast from '../Components/Home/SevenDayForecast';
import { WeatherData, HourData, DayData } from '../Models/weather.data.models';
import { dayDate } from '../Utilities/helperFunctions';

const Home = ({ weatherData, message }: { weatherData: WeatherData | null, message: string}) => {

    if (weatherData === null) return (
        <div className={`message sad`}>
            <p>{message}</p>
        </div>
    );

    const { 
        city,
        country,
        timezone,
        currently,
        hourly,
        daily
    } = weatherData;

    const currHourForecast = hourly.data.filter((hourFcast: HourData) => 
        dayDate(hourFcast.time, {timeZone: timezone}) === dayDate(currently.time, {timeZone: timezone})
    );

    const dailyData = daily.data.filter((dailyFcast: DayData) => 
        dayDate(dailyFcast.time, {timeZone: timezone}) !== dayDate(currently.time, {timeZone: timezone})
    );
    
    return (
        <div id='weather-home'>
            <CurrentWeather 
                city={city}
                country={country}
                timezone={timezone}
                currently={currently}
                currHourForecast={currHourForecast} 
            />
            <SevenDayForecast 
                city={city}
                timezone={timezone}
                dailyData={dailyData} 
            />
        </div>
    );
}

export default Home;