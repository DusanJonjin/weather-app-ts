import { useState } from "react";
import { popularCities } from "../../Fixtures/miscData";
import { insertNewCityInUrl } from '../../Utilities/helperFunctions';
import { Link } from "react-router-dom";

interface PopularCitiesProps {
    pathname: string;
    isHomeUrl: boolean;
    handleNewCity: (newValue: string) => void;
}

export const PopularCities = (props: PopularCitiesProps) => {
    const { pathname, isHomeUrl, handleNewCity } = props;

    const [showAllCities, setShowAllCities] = useState<boolean>(false);


    return (
        <section className={`popular-cities`}>
            <h2>Popular cities</h2>
            <ul className={`cities-ul ${showAllCities ? 'all-cities-ul' : ''}`}>
                {popularCities.map(city => 
                    <li key={city} onClick={() => handleNewCity(city)}>
                        <Link to={`${isHomeUrl ? "/" : insertNewCityInUrl(city, pathname)}`}
                            className='link'
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
