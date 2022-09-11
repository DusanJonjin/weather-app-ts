import { Day, FullDate, Image, TempLowHigh } from '../- Shared -/AllSharedComponents';
import { DayData } from '../../Models/weather.data.models';
import { Languages, Units } from '../../Models/app.data.models';
import { dateObj } from '../../Utilities/dateFunctions';

interface OneDayCardProps {
    dayData: DayData;
    timezone: string;
    language: Languages;
    units: Units
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

    return (
        <article className='one-day-card'>
            <h4 id='day-date'>
                <Day day={day} />
                <FullDate fullDate={date} />
            </h4>
            <Image imgSrc={`/Images/${icon}.png`}
                   imgAlt={icon} />
            <TempLowHigh tempLow={temperatureMin.toFixed(1)}
                tempHigh={temperatureMax.toFixed(1)}
                language={language}
                units={units}                
            />
        </article>
    );
}

export default OneDayCard;
    