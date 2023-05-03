import Image from './Image';
import { getHour } from '../../Utilities/dateFunctions';
import { hourlyFcast, unitsName } from '../../Fixtures/miscData';
import { HourData } from "../../Models/weather.data.models";
import { Languages, Units } from "../../Models/app.data.models";

const tableRowLabels = ['hour', 'icon', 'temperature'];

interface HourForecastProps {
    chosenDayHours: HourData[];
    timezone: string;
    language: Languages;
    units: Units;
}

const HourForecast = (props: HourForecastProps) => {
    const { chosenDayHours, timezone, language, units } = props;

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
                hour?.temperature.toFixed(1) + `${unitsName.temp[units]}`
            );
            default: //do nothing;
        }
    };

    return (
        <section className='hourly-forecast'>
            <h3>{hourlyFcast[language]}</h3>
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