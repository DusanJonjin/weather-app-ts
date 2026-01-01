import {
    CityCountry, 
    Day, 
    FullDate, 
    Year,
    Image, 
} from '../- Shared -/SmallUiParts';
import { HourForecast } from '../- Shared -/HourForecast';
import { OtherWeatherDetails } from '../- Shared -/OtherWeatherDetails';
import { Currently, HourData } from "../../Models/weather.data.models";
import { LanguageCode, UnitCode } from '../../Models/app.data.models';
import { CityNameID } from '../../Hooks/useBookmarks';
import { dateObj } from '../../Utilities/dateFunctions';
import { unitsName } from "../../Fixtures/translation.objects";

interface CurrentWeatherProps {
    cityID: string,
    city: string,
    country: string,
    timezone: string,
    currently: Currently,
    currHourForecast: HourData[],
    toggleCity: (name: string, id:string) => void;
    bookmarks: CityNameID[];
    openAsideMenu: () => void;
    language: LanguageCode;
    units: UnitCode;
}

const CurrentWeather = (props: CurrentWeatherProps) => {

    const { 
        cityID,
        city, 
        country, 
        timezone,
        currently, 
        currHourForecast, 
        toggleCity, 
        bookmarks ,
        openAsideMenu,
        language,
        units
    } = props;

    const { 
        time,
        icon,
        summary,
        temperature,
        ...otherDetails
    } = currently;

    const { day, date, year, localTime } = dateObj(time, language, timezone);

    const isBookmarked: boolean = !!bookmarks.find(bookmark => bookmark.id === cityID);

    return (
        <section className='current-weather'>
            <div id='city-country-star-wrap'>
                <CityCountry 
                    city={city} 
                    country={country}
                    language={language}
                />
                <p onClick={() => (
                        toggleCity(city, cityID), !isBookmarked && openAsideMenu()
                    )}
                    className='bookmark-star'>
                    {isBookmarked ? '\u2605' : '\u2606'}
                </p>
            </div>
            <p className='date-and-year'>
                <Day day={day} />,&nbsp;
                <FullDate fullDate={date} />&nbsp;
                <Year year={year} />&nbsp; - &nbsp;<span>{localTime + 'h'}</span>
            </p>
            <div className='current-wrapper'>
                <div className='image-wrapper'>
                    <Image 
                        imgName={icon}
                        imgFormat='png'
                    />
                </div>
                <div className='temp-summary-wrapper'>
                    <p id='temp-now'>
                        {temperature.toFixed(1)}<sup>{unitsName.temp[units]}</sup>
                    </p>
                    <p className='current-summary'>{summary}</p>
                </div>
                <OtherWeatherDetails 
                    language={language}
                    units={units}
                    { ...otherDetails } 
                />
            </div>
            <HourForecast 
                chosenDayHours={currHourForecast} 
                timezone={timezone} 
                language={language}
                units={units}
            />
        </section>
    );
}

export default CurrentWeather;