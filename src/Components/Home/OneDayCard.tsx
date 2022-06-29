import { Day, FullDate, Image, TempLowHigh } from '../- Shared -/AllSharedComponents';
import { DayData } from '../../Models/weather.data.models';
import { dateObj } from '../../Utilities/helperFunctions';

const OneDayCard = ({ dayData, timezone }: {dayData: DayData, timezone: string}) => {

    const { 
        time,
        icon,
        temperatureMin,
        temperatureMax 
    } = dayData; 

    const { day, date } = dateObj(time, timezone); 

    return (
        <article className='one-day-card'>
            <h4 id='day-date'>
                <Day day={day} />
                <FullDate fullDate={date} />
            </h4>
            <Image imgSrc={`/Images/${icon}.png`}
                   imgAlt={icon} />
            <TempLowHigh tempLow={temperatureMin.toFixed(1)}
                         tempHigh={temperatureMax.toFixed(1)} />
        </article>
    );
}

export default OneDayCard;
    