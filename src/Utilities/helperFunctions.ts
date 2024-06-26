import { BasicData, LanguageCode } from "../Models/app.data.models";
import { initialBasicData, initialCity } from "../Fixtures/initial.app.data";
import { messages, summaryObj } from "../Fixtures/translation.objects";

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


export const showSunBackground = (message: string, language: LanguageCode): string => {
    switch (message) {
        case messages.loading[language]:
        case messages.searching[language]:
        case messages.settingsChange["en"]:
        case messages.settingsChange["rs"]:
            return 'happy';
        case messages.badHomeUrl[language]:
        case messages.badUrl[language]:
        case messages.badHomeSearch[language]:
        case messages.badUrlSearch[language]:
        case messages.badDate[language]:
        case messages.networkError[language]:
        case messages.minLetters[language]:
             return  'sad';
        default: return '';
    }
};

export const translateSummary = (summary: string, language: LanguageCode) => {
    if (language === "rs" && summaryObj.hasOwnProperty(summary)) {
        return summaryObj[summary];
    }
    return summary;
};
