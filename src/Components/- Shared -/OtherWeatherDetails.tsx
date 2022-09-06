import { useState } from 'react';

interface OtherWeatherDetailsProps {
    [key: string]: string | number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    uvIndex: number;
    visibility: number;
    ozone: number;
    cloudCover: number;
    windBearing: number;
}

const OtherWeatherDetails = (props: OtherWeatherDetailsProps) => {
    const {
        pressure,
        humidity,
        windSpeed,
        uvIndex,
        visibility,
        ozone,
        cloudCover,
        windBearing,
    } = props;

    const [showAllOtherDetails, setShowAllOtherDetails] = useState<boolean>(false);

    const toggleDetails = () => {
        setShowAllOtherDetails(prevShowDetails => !prevShowDetails)
    };

    const humidityPercentage = `${(humidity * 100).toFixed()}%`;
    const rounded = (unit: number) => unit.toFixed(1);

    return (
        <div className='other-details-wrapper'>
            <div className={`other-details ${showAllOtherDetails ? 'show-details' : ''}`}>
                <p>Pressure:&ensp;<span>{rounded(pressure)} hPa</span></p>
                <p>Humidity:&ensp;<span>{humidityPercentage}</span></p>
                <p>Wind speed:&ensp;<span>{rounded(windSpeed)} km/h</span></p>
                <p>UV index:&ensp;<span>{uvIndex}</span></p>
                <p>Visibility:&ensp;<span>{rounded(visibility)} km</span></p>
                <p>Ozone:&ensp;<span>{rounded(ozone)} ppb</span></p>
                <p>Cloud cover:&ensp;<span>{rounded(cloudCover)} Oktas</span></p>
                <p>Wind direction:&ensp;<span>{windBearing}°</span></p>
            </div>
            <div className={`expand-triangle ${showAllOtherDetails ? 'is-expanded' : ''}`} 
                onClick={() => toggleDetails()}
            >
            </div>
        </div>
    )
}

export default OtherWeatherDetails;
