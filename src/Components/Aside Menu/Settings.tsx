import { Key } from "../../Hooks/useDefaultData";

const allLanguages = [
    {name: "English", code: "en"}, 
    {name: "Srpski", code: 'rs'}
];

const allUnits = [
    {name: "Metric", code: "ca"},
    {name: "US", code: "us"}
];

interface SettingsProps {
    toggleNewValue : (key: Key, value: string) => void;
    handleLangUnitsChange: (settingsName: string, newCode: string) => void;
}

export const Settings = (props: SettingsProps) => {
    const { toggleNewValue, handleLangUnitsChange } = props;

    return (
        <section className='settings'>
            <h2>Language</h2>
            <div>
                {allLanguages.map(({ name, code }) => 
                    <p key={code}
                        onClick={() => (
                            toggleNewValue("language", code), 
                            handleLangUnitsChange("language", code)
                        )}
                    >
                        {name}
                    </p> 
                )}
            </div>
            <h2>Units</h2>
            <div>
                {allUnits.map(({ name, code }) => 
                    <p key={code} 
                        onClick={() => (
                            toggleNewValue("units", code), 
                            handleLangUnitsChange("units", code)
                        )}
                    >
                        {name}
                    </p> 
                )}
            </div>
        </section>
    );
}
