import CityCountry from './CityCountry';
import Day  from './Day';
import FullDate  from './FullDate';
import Year from './Year';
import Image  from './Image';
import TempLowHigh  from './TempLowHigh';
import OtherWeatherDetails from './OtherWeatherDetails';
import  HourForecast  from './HourForecast';

/* We import all of the joint components in this file, so that we can
export them later in parent components together as needed. We do this
to avoid too much boilerplate code in our parent components, 
by importing them one by one. */

export { 
    CityCountry, 
    Day, 
    FullDate, 
    Year,
    Image,  
    TempLowHigh,
    OtherWeatherDetails,
    HourForecast
};