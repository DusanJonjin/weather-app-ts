interface CityCountryProps {
    city: string,
    country: string
}

const CityCountry = ({ city, country='' }: CityCountryProps) => {
    return (
        <h1 className='city-country'>
            {city}{country && `, ${country}`}
        </h1>
    );
}

export default CityCountry;