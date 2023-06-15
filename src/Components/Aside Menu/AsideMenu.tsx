import { Bookmarks } from './Bookmarks';
import { PopularCities } from './PopularCities';
import { Settings } from './Settings';
import { useDefaultData } from '../../Hooks/useDefaultData';
import { BasicData, LanguageCode, UnitCode } from '../../Models/app.data.models';
import { City, CityNameID } from '../../Hooks/useBookmarks';
import { languagesList } from '../../Fixtures/initial.app.data';
import { useLocation } from "react-router-dom";

interface AsideMenuProps {
    showAsideMenu: boolean;
    handleCityChange: (newValue: string) => void;
    bookmarks: CityNameID[];
    toggleCity: (name: string, id: string) => void;
    basicData: BasicData;
    handleLanguageChange: (language: LanguageCode) => void;
    handleUnitsChange: (units: UnitCode) => void;
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
    const { language } = basicData;
    const lang = languagesList.includes(language) ? language : "en"; 
    
    return (
        <aside className={`aside ${showAsideMenu ? '' : 'hide-aside'}`}>
            <div>
                <Bookmarks 
                    bookmarks={bookmarks}
                    defaultData={defaultData}
                    toggleNewValue={toggleNewValue}
                    toggleCity={toggleCity}
                    handleCityChange={handleCityChange}
                    pathname={pathname}
                    isHomeUrl={isHomeUrl}
                    lang={lang}
                />
                <PopularCities 
                    pathname={pathname}
                    isHomeUrl={isHomeUrl}
                    handleCityChange={handleCityChange}
                    lang={lang}
                />
                <Settings 
                    defaultData={defaultData}
                    toggleNewValue={toggleNewValue} 
                    handleLanguageChange={handleLanguageChange}
                    handleUnitsChange={handleUnitsChange}
                    lang={lang}
                />
            </div>
        </aside>
    );
};

export default AsideMenu;
