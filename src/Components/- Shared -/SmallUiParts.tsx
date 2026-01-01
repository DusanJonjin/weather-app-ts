import { cyrillicToLatin } from "../../Utilities/helperFunctions";
import { LanguageCode, UnitCode } from "../../Models/app.data.models";
import { showSunBackground } from '../../Utilities/helperFunctions';
import { temp, unitsName } from "../../Fixtures/translation.objects";

interface CityCountryProps {
    city: string,
    country: string,
    language: LanguageCode
}

const CityCountry = ({ city, country = '', language }: CityCountryProps) => {
    const cityAndCountryRaw = `${city}${country ? `, ${country}` : ''}`;
    const cityAndCountry = language === 'rs' ? cyrillicToLatin(cityAndCountryRaw): cityAndCountryRaw;

    return (
        <h2 className='city-country'>
            {cityAndCountry}
        </h2>
    );
};


const Day = ({ day }: { day: string }) => {
    return (
        <span>
            {day}
        </span>
    )
};


const FullDate = ({ fullDate }: { fullDate: string }) => {
    return (
        <span>
            {fullDate}
        </span>
    )
};


interface ImageProps {
    imgName: string;
    imgFormat: string;
}

const Image = (props: ImageProps) => {
    const { imgName, imgFormat } = props;

    const iconSrc = imgName ==="mixed" ? "sleet" : imgName;
    const imgSrc = `/Images/${iconSrc}.${imgFormat}`;

    return (
        <img src={imgSrc} alt={imgName} />
    );
};


interface MessageProps {
    message: string;
    language: LanguageCode;
}

const Message = (props: MessageProps) => {
    const { message, language } = props;
    return (
        <div className={`message ${showSunBackground(message, language)}`}>
            <p>{message}</p>
        </div>
    );
};


interface TempLowHighProps {
    tempLow: string;
    tempHigh: string;
    dayPage?: boolean;
    language: LanguageCode;
    units: UnitCode;
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
};


const Year = ({ year }: { year: string }) => {
  return (
    <span>{year}</span>
  )
};


export {
    CityCountry,
    Day,
    FullDate,
    Image,
    Message,
    TempLowHigh,
    Year
};
