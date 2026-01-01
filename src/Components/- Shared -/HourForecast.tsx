import { Image } from "./SmallUiParts";
import { getHour } from '../../Utilities/dateFunctions';
import { hourlyFcast, unitsName } from "../../Fixtures/translation.objects";
import { HourData } from "../../Models/weather.data.models";
import { LanguageCode, UnitCode } from "../../Models/app.data.models";

const tableRowLabels = ['hour', 'icon', 'temperature'];

interface HourForecastProps {
    chosenDayHours: HourData[];
    timezone: string;
    language: LanguageCode;
    units: UnitCode;
}

export const HourForecast = (props: HourForecastProps) => {
    const { chosenDayHours, timezone, language, units } = props;

    const tableDataValue = (rowLabel: string, hour: HourData) => {
        switch (rowLabel) {
            case 'hour': return (
                <>{getHour(hour.time, timezone) + 'h'}</>
            );
            case 'icon': return (
                <Image 
                    imgName={hour.icon}
                    imgFormat='png'
                />
            );
            case 'temperature': return (
                <>{hour?.temperature.toFixed(1) + `${unitsName.temp[units]}`}</>
            );
            default: return <></>;
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
