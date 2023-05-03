import { Bookmarks } from './Bookmarks';
import { PopularCities } from './PopularCities';
import { Settings } from './Settings';
import { useDefaultData } from '../../Hooks/useDefaultData';
import { BasicData, Languages, languagesList ,Units, unitsList } from '../../Models/app.data.models';
import { City, CityNameID } from '../../Hooks/useBookmarks';
import { asideMenu } from '../../Fixtures/miscData';
import { useLocation } from "react-router-dom";

const { 
    bmarks, 
    popCities, 
    ...allSettings
} = asideMenu;

interface AsideMenuProps {
    showAsideMenu: boolean;
    handleCityChange: (newValue: string) => void;
    bookmarks: CityNameID[];
    toggleCity: (name: string, id: string) => void;
    basicData: BasicData;
    handleLanguageChange: (language: Languages) => void;
    handleUnitsChange: (units: Units) => void;
    city: City;
}

const AsideMenu = (props: AsideMenuProps) => {
    const { 
        showAsideMenu,
        handleCityChange,
        bookmarks,
        toggleCity,
        basicData,
        handleLanguageChange,
        handleUnitsChange,
        city
    } = props;

    const { pathname } = useLocation();

    const isHomeUrl = pathname === "/";

    const { toggleNewValue, defaultData } = useDefaultData(basicData, city);

    const { language, units } = basicData;

    const lang = languagesList.includes(language) ? language : "en"; 

    const bmarksHeading = bmarks[lang]; 

    const popCitiesHeading = popCities[lang];
    
    return (
        <aside className={`aside ${showAsideMenu ? '' : 'hide-aside'}`}>
            <div>
                <Bookmarks bookmarks={bookmarks}
                    defaultData={defaultData}
                    toggleNewValue={toggleNewValue}
                    toggleCity={toggleCity}
                    handleCityChange={handleCityChange}
                    pathname={pathname}
                    isHomeUrl={isHomeUrl}
                    bmarksHeading={bmarksHeading}
                />
                <PopularCities pathname={pathname}
                    isHomeUrl={isHomeUrl}
                    handleCityChange={handleCityChange}
                    popCitiesHeading={popCitiesHeading}
                />
                <Settings defaultData={defaultData}
                    toggleNewValue={toggleNewValue} 
                    handleLanguageChange={handleLanguageChange}
                    handleUnitsChange={handleUnitsChange}
                    allSettings={allSettings}
                    lang={lang}
                />
            </div>
        </aside>
    );
};

export default AsideMenu;
