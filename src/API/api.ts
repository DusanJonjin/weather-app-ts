import { WeatherData } from "../Models/weather.data.models";
import { GeoLocationIq } from "../Models/location.data.models";

interface LocatioIqFetchErr {
    error: string;
}

interface ApiErrorMsgs {
    badUrlSearch: string;
    networkError: string;
}


export const getWeather = async (
    searchValue: string, 
    badUrlSearch: string,
    networkError: string,
    handleErrorMsg: (message: string) => void
    ): Promise<WeatherData | null> => {
    try {
        const getGeoLocation = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${import.meta.env.VITE_GEODATA_KEY}&q=${searchValue}&format=json&limit=1`
        );
        const geoLocationResult: LocatioIqFetchErr | GeoLocationIq = await getGeoLocation.json();
        if (!Array.isArray(geoLocationResult)) {
            handleErrorMsg(badUrlSearch);
            return null;
        }
        const geoLocationData = geoLocationResult[0];
        const { lat, lon, display_name } = geoLocationData;
        const displayNameInArr = display_name.split(', ');
        const city = displayNameInArr[0];
        const country = displayNameInArr[displayNameInArr.length - 1];
        const searchedPlace = {city, country};
    
        const getWeather = await fetch(
        `https://serene-basin-16003.herokuapp.com/https://api.darksky.net/forecast/${import.meta.env.VITE_DARKSKY_KEY}/${lat + ',' + lon}?exclude=flags,alerts,minutely&&units=ca&&extend=hourly`
        );
        const weatherResult: Omit<WeatherData, "city" | "country"> = await getWeather.json();
        const fullWeatherData = {...weatherResult, ...searchedPlace}
        
        return fullWeatherData;  
    }
    catch (err) {
        handleErrorMsg(networkError);
        return null;
    }
  }
  