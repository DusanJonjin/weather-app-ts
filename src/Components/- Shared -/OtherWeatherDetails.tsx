import { useState } from 'react';
import { otherDetails, unitsName } from "../../Fixtures/miscData";
import { Languages, Units } from "../../Models/app.data.models";

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
    language: Languages;
    units: Units;
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
        language,
        units
    } = props;

    const {
    pressureName,
    humidityName,
    windSpeedName,
    uvIndexName,
    visibilityName,
    ozoneName,
    cloudCoverName,
    windDirectionName,
    } = otherDetails;

    const [showAllOtherDetails, setShowAllOtherDetails] = useState<boolean>(false);

    const toggleDetails = () => {
        setShowAllOtherDetails(prevShowDetails => !prevShowDetails)
    };

    const humidityPercentage = `${(humidity * 100).toFixed()}%`;
    const rounded = (unit: number) => unit.toFixed(1);

    return (
        <div className='other-details-wrapper'>
            <div className={`other-details ${showAllOtherDetails ? 'show-details' : ''}`}>
                <p>{pressureName[language]}:&ensp;<span>{rounded(pressure)} hPa</span></p>
                <p>{humidityName[language]}:&ensp;<span>{humidityPercentage}</span></p>
                <p>{windSpeedName[language]}:&ensp;<span>{rounded(windSpeed)} {unitsName.speed[units]}</span></p>
                <p>{uvIndexName[language]}:&ensp;<span>{uvIndex}</span></p>
                <p>{visibilityName[language]}:&ensp;<span>{rounded(visibility)} {unitsName.distance[units]}</span></p>
                <p>{ozoneName[language]}:&ensp;<span>{rounded(ozone)} ppb</span></p>
                <p>{cloudCoverName[language]}:&ensp;<span>{rounded(cloudCover)} Oktas</span></p>
                <p>{windDirectionName[language]}:&ensp;<span>{windBearing}°</span></p>
            </div>
            <div className={`expand-triangle ${showAllOtherDetails ? 'is-expanded' : ''}`} 
                onClick={() => toggleDetails()}
            >
            </div>
        </div>
    )
}

export default OtherWeatherDetails;
