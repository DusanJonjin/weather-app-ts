import { Key } from "../../Hooks/useDefaultData";
import { BasicData, Units, Languages } from "../../Models/app.data.models";

interface Language {
    name: string;
    code: Languages;
}

const allLanguages: Language[] = [
    {name: "English", code: "en"}, 
    {name: "Srpski", code: 'rs'}
];

interface Unit {
    name: string;
    code: Units;
}

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
    handleLanguageChange: (language: Languages) => void;
    handleUnitsChange: (units: Units) => void;
    allSettings: {sett: Setting, settLang: Setting, settUnits: Setting};
    lang: Languages;
}

export const Settings = (props: SettingsProps) => {
    const { 
        defaultData, 
        toggleNewValue, 
        handleLanguageChange, 
        handleUnitsChange, 
        allSettings, 
        lang 
    } = props;

    const { units, language } = defaultData;

    const { sett, settLang, settUnits } = allSettings;

    return (
        <section className='settings'>
            <h2>{sett[lang]}</h2>
            <h3>{settLang[lang]}</h3>
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
            <h3>{settUnits[lang]}</h3>
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
