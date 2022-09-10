import Image from './Image';
import { getHour } from '../../Utilities/helperFunctions';
import { HourData } from "../../Models/weather.data.models";

interface HourForecastProps {
    chosenDayHours: HourData[],
    timezone: string
}

const HourForecast = ({ chosenDayHours, timezone }: HourForecastProps) => {

    const tableRowLabels = ['hour', 'icon', 'temperature'];

    const tableDataValue = (rowLabel: string, hour: HourData) => {
        switch (rowLabel) {
            case 'hour': return (getHour(hour.time, timezone) + 'h');
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