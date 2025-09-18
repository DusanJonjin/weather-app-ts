import { useState } from "react";
import { LanguageCode } from "../../Models/app.data.models";
import { insertNewCityInUrl } from '../../Utilities/helperFunctions';
import { popCitiesLabels, popularCities } from "../../Fixtures/translation.objects";
import { Link } from "react-router-dom";

interface PopularCitiesProps {
    pathname: string;
    isHomeUrl: boolean;
    handleCityChange: (newValue: string) => void;
    lang: LanguageCode;
}

export const PopularCities = (props: PopularCitiesProps) => {
    const { pathname, isHomeUrl, handleCityChange, lang } = props;

    const [showAllCities, setShowAllCities] = useState<boolean>(false);

    return (
        <section className={`popular-cities`}>
            <h2>{popCitiesLabels[lang]}</h2>
            <ul className={`cities-ul ${showAllCities ? 'all-cities-ul' : ''}`}>
                {popularCities[lang].map(city => 
                    <li key={city} >
                        <Link to={`${isHomeUrl ? "/" : insertNewCityInUrl(city, pathname)}`}
                            className='link'
                            onClick={() => handleCityChange(city)}
                        >
                            {city}
                        </Link>
                    </li>
                )}
            </ul>
            <div className={`expand-triangle ${showAllCities ? 'is-expanded' : ''}`} 
                onClick={() => setShowAllCities(prevShow => !prevShow)}
            >
            </div>
        </section>
    );
}
