import React from 'react';

interface OtherWeatherDetailsProps {
    pressure: number;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
}

const OtherWeatherDetails = (props: OtherWeatherDetailsProps) => {
    const {
        pressure,
        humidity,
        windSpeed,
        uvIndex,
    } = props;

    const humidityPercentage = `${(humidity * 100).toFixed()}%`;

    return (
        <div className='other-details-wrapper'>
            <p>Pressure: {pressure} mbar</p>
            <p>Humidity: {humidityPercentage}</p>
            <p>Wind speed: {windSpeed} m/s</p>
            <p>UV index: {uvIndex}</p>
        </div>
    )
}

export default OtherWeatherDetails;
