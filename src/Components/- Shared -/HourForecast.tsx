import Image from './Image';
import { HourData } from "../../Models/weather.data.models";

interface HourForecastProps {
    chosenDayHours: HourData[],
    timezone: string
}

const HourForecast = ({ chosenDayHours, timezone }: HourForecastProps) => {

    /* With this function we return hours of a day (converted to
    2-digit hours from miliseconds),based on parameter. We need to
    use regEx to get the wanted value: */
    const getHours = (time: number): string => {
        const dateHour = new Date(time * 1000).toLocaleDateString(
            'en', {hour:'2-digit', hour12: false, timeZone: timezone}
        );
        const hourAll: string[] | null = dateHour.match(/(?<=, ).*/);
        const justHour = hourAll !== null ? hourAll[0] : ''
        if (justHour === '24') return '00';
        return justHour;
    };

    /* Then, we use this function to filter out hourly array
    (only PAIR hours of a day (24h) will be shown): 
    const filterPairHours = dayHours => (
        dayHours.filter(h => !(getHours(h) % 2))
    );*/

    const tableRowLabels = ['hour', 'icon', 'temperature'];

    const tableDataValue = (rowLabel: string, hour: HourData) => {
        switch (rowLabel) {
            case 'hour': return (getHours(hour.time) + 'h');
            case 'icon': return (
                <Image 
                    imgSrc={`/Images/${hour.icon}.png`}
                    imgAlt={hour.icon} 
                />
            );
            case 'temperature': return (
                hour?.temperature.toFixed(1) + '°C'
            );
            default: //do nothing;
        }
    };

    return (
        <section className='hourly-forecast'>
            <h3>Hourly forecast</h3>
            <div className='table-wrap'>
                <table>
                    <tbody>
                        {tableRowLabels.map(rowLabel => 
                            <tr key={rowLabel}>
                                {chosenDayHours.map(hour => 
                                    <td key={hour.time} className={`td-${rowLabel}`}>
                                        {tableDataValue(rowLabel, hour)}
                                    </td>                
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HourForecast;