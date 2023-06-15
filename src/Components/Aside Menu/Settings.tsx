import { Key } from "../../Hooks/useDefaultData";
import { BasicData, LanguageCode, UnitCode, Language, Unit } from "../../Models/app.data.models";
import { settingsLabels } from "../../Fixtures/translation.objects";

const allLanguages: Language[] = [
    {name: "English", code: "en"}, 
    {name: "Srpski", code: 'rs'}
];

const allUnits: Unit[] = [
    {name: "Metric", code: "ca"},
    {name: "US", code: "us"}
];

interface Setting {
    en: string, 
    rs: string
}

interface SettingsProps {
    defaultData: BasicData;
    toggleNewValue : (key: Key, value: string) => void;
    handleLanguageChange: (language: LanguageCode) => void;
    handleUnitsChange: (units: UnitCode) => void;
    lang: LanguageCode;
}

export const Settings = (props: SettingsProps) => {
    const { 
        defaultData, 
        toggleNewValue, 
        handleLanguageChange, 
        handleUnitsChange,
        lang,
    } = props;

    const { units, language } = defaultData;

    return (
        <section className='settings'>
            <h2>{settingsLabels.main[lang]}</h2>
            <h3>{settingsLabels.language[lang]}</h3>
            <div>
                {allLanguages.map(({ name, code }) => 
                    <p key={code}>
                        <span className={`default ${language === code ? "checked" : ""}`}
                        onClick={() => (
                            toggleNewValue("language", code), 
                            handleLanguageChange(code)
                        )}
                        >
                            {name}
                        </span>
                    </p> 
                )}
            </div>
            <h3>{settingsLabels.units[lang]}</h3>
            <div>
                {allUnits.map(({ name, code }) => 
                    <p key={code}>
                        <span className={`default ${units === code ? "checked" : ""}`}
                            onClick={() => (
                                toggleNewValue("units", code), 
                                handleUnitsChange(code)
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
