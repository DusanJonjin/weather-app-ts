import { cyrillicToLatin } from "../../Utilities/helperFunctions";
import { LanguageCode } from "../../Models/app.data.models";

interface CityCountryProps {
    city: string,
    country: string,
    language: LanguageCode
}

const CityCountry = ({ city, country = '', language }: CityCountryProps) => {
    const cityAndCountryRaw = `${city}${country ? `, ${country}` : ''}`;
    const cityAndCountry = language === 'en' ? cityAndCountryRaw : cyrillicToLatin(cityAndCountryRaw);

    return (
        <h2 className='city-country'>
            {cityAndCountry}
        </h2>
    );
}

export default CityCountry;