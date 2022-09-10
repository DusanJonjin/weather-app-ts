import { Bookmarks } from './Bookmarks';
import { PopularCities } from './PopularCities';
import { Settings } from './Settings';
import { useDefaultData } from '../../Hooks/useDefaultData';
import { BasicData } from "../../WeatherApp";
import { City, CityNameID } from '../../Hooks/useBookmarks';
import { useLocation } from "react-router-dom";

interface AsideMenuProps {
    showAsideMenu: boolean;
    handleNewCity: (newValue: string) => void;
    bookmarks: CityNameID[];
    toggleCity: (name: string, id: string) => void;
    basicData: BasicData;
    handleLangUnitsChange: (settingsName: string, newCode: string) => void;
    city: City;
}

const AsideMenu = (props: AsideMenuProps) => {
    const { 
        showAsideMenu,
        handleNewCity,
        bookmarks,
        toggleCity,
        basicData,
        handleLangUnitsChange,
        city
    } = props;

    const { pathname } = useLocation();

    const isHomeUrl = pathname === "/";

    const { toggleNewValue, defaultData } = useDefaultData(basicData, city);

    return (
        <aside className={`aside ${showAsideMenu ? '' : 'hide-aside'}`}>
            <div>
                <Bookmarks bookmarks={bookmarks}
                    defaultData={defaultData}
                    toggleNewValue={toggleNewValue}
                    toggleCity={toggleCity}
                    handleNewCity={handleNewCity}
                    pathname={pathname}
                    isHomeUrl={isHomeUrl}
                />
                <PopularCities pathname={pathname}
                    isHomeUrl={isHomeUrl}
                    handleNewCity={handleNewCity}
                />
                <Settings defaultData={defaultData}
                    toggleNewValue={toggleNewValue} 
                    handleLangUnitsChange={handleLangUnitsChange}
                />
            </div>
        </aside>
    );
};

export default AsideMenu;
