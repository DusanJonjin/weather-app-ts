import { useState } from "react";
import { popularCities } from "../../Fixtures/miscData";
import { insertNewCityInUrl } from '../../Utilities/helperFunctions';
import { Link } from "react-router-dom";

interface PopularCitiesProps {
    pathname: string;
    isHomeUrl: boolean;
    handleCityChange: (newValue: string) => void;
    popCitiesHeading: string;
}

export const PopularCities = (props: PopularCitiesProps) => {
    const { pathname, isHomeUrl, handleCityChange, popCitiesHeading } = props;

    const [showAllCities, setShowAllCities] = useState<boolean>(false);

    return (
        <section className={`popular-cities`}>
            <h2>{popCitiesHeading}</h2>
            <ul className={`cities-ul ${showAllCities ? 'all-cities-ul' : ''}`}>
                {popularCities.map(city => 
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
