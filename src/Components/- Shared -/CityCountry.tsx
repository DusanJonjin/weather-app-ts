interface CityCountryProps {
    city: string,
    country: string
}

const CityCountry = ({ city, country='' }: CityCountryProps) => {
    return (
        <h2 className='city-country'>
            {city}, {country ? `${country}` : ''}
        </h2>
    );
}

export default CityCountry;