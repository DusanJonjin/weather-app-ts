import { WeatherData } from "../Models/weather.data.models";
import { GeoLocationIq } from "../Models/location.data.models";
import { BasicData } from "../Models/app.data.models";

interface LocatioIqFetchErr {
    error: string;
}

interface ErrorStringObj {
    en: string;
    rs: string;
}

const BASE_URL = "https://api.pirateweather.net/forecast/";
const GEODATA_KEY = import.meta.env.VITE_GEODATA_KEY;
const PIRATEWEATHER_KEY = import.meta.env.VITE_PIRATEWEATHER_KEY;

export const getWeather = async (
    basicData: BasicData,
    badUrlSearch: ErrorStringObj,
    networkError: ErrorStringObj,
    handleErrorMsg: (message: string) => void
    ): Promise<WeatherData | null> => {
    const { searchedCity, units, language } = basicData;
    const lang = language === "rs" ? "sr" : language;
    try {
        const getGeoLocation = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${GEODATA_KEY}&q=${searchedCity}&format=json&limit=1&accept-language=${lang}`
        );
        const geoLocationResult: LocatioIqFetchErr | GeoLocationIq = await getGeoLocation.json();
        if (!Array.isArray(geoLocationResult)) {
            handleErrorMsg(badUrlSearch[language]);
            return null;
        }
        const geoLocationData = geoLocationResult[0];
        const { place_id, lat, lon, display_name } = geoLocationData;
        const displayNameInArr = display_name.split(', ');
        const city = displayNameInArr[0];
        const country = displayNameInArr[displayNameInArr.length - 1];
        const searchedPlace = {cityID: place_id, city, country};
    
        const getWeather = await fetch(
        `${BASE_URL}${PIRATEWEATHER_KEY}/${lat + ',' + lon}?exclude=flags,alerts,minutely&units=${units}&extend=hourly&lang=${lang}`
        );
        const weatherResult: Omit<WeatherData, "city" | "country" | "cityID"> = await getWeather.json();
        const fullWeatherData: WeatherData = {...weatherResult, ...searchedPlace}
        
        return fullWeatherData;  
    }
    catch (err) {
        handleErrorMsg(networkError[language]);
        return null;
    }
};
  