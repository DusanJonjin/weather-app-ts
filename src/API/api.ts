import { WeatherData } from "../Models/weather.data.models";
import { GeoLocationIq } from "../Models/location.data.models";
import { BasicData } from "../Models/app.data.models";

interface LocatioIqFetchErr {
    error: string;
}

const BASE_URL = "https://api.pirateweather.net/forecast/";
const GEODATA_KEY = import.meta.env.VITE_GEODATA_KEY;
const PIRATEWEATHER_KEY = import.meta.env.VITE_PIRATEWEATHER_KEY;

export const getWeather = async (
    basicData: BasicData,
    badUrlSearch: string,
    networkError: string,
    handleErrorMsg: (message: string) => void
    ): Promise<WeatherData | null> => {
    const { searchedCity, units, language } = basicData;
    try {
        const getGeoLocation = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${GEODATA_KEY}&q=${searchedCity}&format=json&limit=1&accept-language=${language}`
        );
        const geoLocationResult: LocatioIqFetchErr | GeoLocationIq = await getGeoLocation.json();
        if (!Array.isArray(geoLocationResult)) {
            handleErrorMsg(badUrlSearch);
            return null;
        }
        const geoLocationData = geoLocationResult[0];
        const { place_id, lat, lon, display_name } = geoLocationData;
        const displayNameInArr = display_name.split(', ');
        const city = displayNameInArr[0];
        const country = displayNameInArr[displayNameInArr.length - 1];
        const searchedPlace = {cityID: place_id, city, country};
    
        const getWeather = await fetch(
        `${BASE_URL}${PIRATEWEATHER_KEY}/${lat + ',' + lon}?exclude=flags,alerts,minutely&units=${units}&extend=hourly`
        );
        const weatherResult: Omit<WeatherData, "city" | "country"> = await getWeather.json();
        const fullWeatherData: WeatherData = {...weatherResult, ...searchedPlace}
        
        return fullWeatherData;  
    }
    catch (err) {
        handleErrorMsg(networkError);
        return null;
    }
};
  