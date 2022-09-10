import { Key } from "../../Hooks/useDefaultData";
import { BasicData } from "../../WeatherApp";

const allLanguages = [
    {name: "English", code: "en"}, 
    {name: "Srpski", code: 'rs'}
];

const allUnits = [
    {name: "Metric", code: "ca"},
    {name: "US", code: "us"}
];

interface SettingsProps {
    defaultData: BasicData;
    toggleNewValue : (key: Key, value: string) => void;
    handleLangUnitsChange: (settingsName: string, newCode: string) => void;
}

export const Settings = (props: SettingsProps) => {
    const { defaultData, toggleNewValue, handleLangUnitsChange } = props;

    const { units, language } = defaultData;

    return (
        <section className='settings'>
            <h2>Settings</h2>
            <h3>Language</h3>
            <div>
                {allLanguages.map(({ name, code }) => 
                    <p key={code}>
                        <span className={`default ${language === code ? "checked" : ""}`}
                        onClick={() => (
                            toggleNewValue("language", code), 
                            handleLangUnitsChange("language", code)
                        )}
                        >
                            {name}
                        </span>
                    </p> 
                )}
            </div>
            <h3>Units</h3>
            <div>
                {allUnits.map(({ name, code }) => 
                    <p key={code}>
                        <span className={`default ${units === code ? "checked" : ""}`}
                            onClick={() => (
                                toggleNewValue("units", code), 
                                handleLangUnitsChange("units", code)
                            )}
                        >
                            {name}
                        </span>
                    </p> 
                )}
            </div>
        </section>
    );
}
