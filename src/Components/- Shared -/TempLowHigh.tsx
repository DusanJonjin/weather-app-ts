import { temp, unitsName } from "../../Fixtures/miscData";
import { Languages, Units } from "../../Models/app.data.models";

interface TempLowHighProps {
    tempLow: string;
    tempHigh: string;
    dayPage?: boolean;
    language: Languages;
    units: Units;
}

const TempLowHigh = (props: TempLowHighProps) => {
    const { 
        tempLow,
        tempHigh,
        dayPage=false,
        language,
        units
    } = props;

    return (
    <div className='temp-lowhigh'>
        <p>{dayPage ? `${temp.low[language]}: ` : ''}<span id='low'>
            {tempLow}<sup>{unitsName.temp[units]}</sup></span>
        </p>
        <p>{dayPage ? `${temp.high[language]}: ` : ''}<span id='high'>
            {tempHigh}<sup>{unitsName.temp[units]}</sup></span>
        </p>
    </div>
    );
}

export default TempLowHigh;