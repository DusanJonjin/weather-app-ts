import { Day, FullDate, Image, TempLowHigh } from '../- Shared -/SmallUiParts';
import { DayData } from '../../Models/weather.data.models';
import { LanguageCode, UnitCode } from '../../Models/app.data.models';
import { dateObj } from '../../Utilities/dateFunctions';

interface OneDayCardProps {
    dayData: DayData;
    timezone: string;
    language: LanguageCode;
    units: UnitCode;
}

const OneDayCard = (props: OneDayCardProps) => {
    const { dayData, timezone, language, units } = props;

    const { 
        time,
        icon,
        temperatureMin,
        temperatureMax 
    } = dayData; 

    const { day, date } = dateObj(time, language, timezone);

    const iconSrc = icon ==="mixed" ? "sleet" : icon;

    return (
        <article className='one-day-card'>
            <h4 id='day-date'>
                <Day day={day} />
                <FullDate fullDate={date} />
            </h4>
            <Image 
                imgSrc={`/Images/${iconSrc}.png`}
                imgAlt={icon} 
            />
            <TempLowHigh 
                tempLow={temperatureMin.toFixed(1)}
                tempHigh={temperatureMax.toFixed(1)}
                language={language}
                units={units}                
            />
        </article>
    );
}

export default OneDayCard;
    