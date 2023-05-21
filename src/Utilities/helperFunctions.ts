import { BasicData } from "../Models/app.data.models";
import { initialBasicData } from "../Fixtures/initial.app.data";
import { initialCity } from "../Fixtures/initial.app.data";
import { messages } from "../Fixtures/miscData";

const requiredUrlPart = '/DailyForecast/';

export const insertNewCityInUrl = (newCity: string, pathname: string) => {
    const cityAndDatefromUrl = pathname.slice(requiredUrlPart.length);
    const underscoreDate = cityAndDatefromUrl.slice(cityAndDatefromUrl.indexOf('_'));
    if (!underscoreDate) return pathname;
    const newUrl = requiredUrlPart + newCity + underscoreDate;
    return newUrl;
};

const findCityFromUrl = (pathname: string, storageString: string | null): BasicData => {
    const urlFirstPart = pathname.slice(0, requiredUrlPart.length);
    if (!urlFirstPart.includes(requiredUrlPart)) return initialBasicData;

    const cityAndDatefromUrl = pathname.slice(requiredUrlPart.length);
    if(!cityAndDatefromUrl) return initialBasicData;

    const underscoreArr = cityAndDatefromUrl.match(/_/g);
    if (!underscoreArr || underscoreArr.length > 1) return initialBasicData;

    const city = cityAndDatefromUrl.slice(0, cityAndDatefromUrl.indexOf('_'));
    if (storageString === null) return {...initialBasicData, searchedCity: city};

    const storageBData: BasicData = JSON.parse(storageString);
    return {...storageBData, searchedCity: city};
};

// Do this on first App mount and home URL or DailyForecast URL page refresh
export const getDataFromStorageOrUrl = (pathname: string): BasicData => {
    const storageString: string | null = localStorage.getItem("default-data");
    if (pathname === '/') {
        if (storageString === null) return ({...initialBasicData, ...initialCity});
        const storageBdata: BasicData = JSON.parse(storageString);
        return storageBdata;
    }
    else return findCityFromUrl(pathname, storageString);
};


export const showSunBackground = (message: string): string => {
    switch (message) {
        case messages.loading: 
        case messages.searching:
        case messages.settingsChange:
            return 'happy';
        case messages.badHomeUrl:
        case messages.badUrl:
        case messages.badHomeSearch:
        case messages.badUrlSearch:
        case messages.badDate:
        case messages.networkError:
        case messages.minLetters:
             return  'sad';
        default: return '';
    }
};
