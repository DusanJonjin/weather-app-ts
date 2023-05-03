import { BasicData } from "../Models/app.data.models";

const requiredUrlPart = '/DailyForecast/';

export const insertNewCityInUrl = (newCity: string, pathname: string) => {
    const cityAndDatefromUrl = pathname.slice(requiredUrlPart.length);
    const underscoreDate = cityAndDatefromUrl.slice(cityAndDatefromUrl.indexOf('_'));
    if (!underscoreDate) return pathname;
    const newUrl = requiredUrlPart + newCity + underscoreDate;
    return newUrl;
};

const initialData: BasicData = {
    searchedCity: "",
    id: "",
    units: "ca",
    language: "en",
};

export const initialCity = {
    searchedCity: "Belgrade", 
    id: "274920360"
};

const findCityFromUrl = (pathname: string, storageString: string | null): BasicData => {
    const pathnameFirstPart = pathname.slice(0, requiredUrlPart.length);
    if (!pathnameFirstPart.includes(requiredUrlPart)) return initialData;

    const cityAndDatefromUrl = pathname.slice(requiredUrlPart.length);
    if(!cityAndDatefromUrl) return initialData;

    const underscoreArr = cityAndDatefromUrl.match(/_/g);
    if (!underscoreArr || underscoreArr.length > 1) return initialData;

    const city = cityAndDatefromUrl.slice(0, cityAndDatefromUrl.indexOf('_'));
    if (storageString === null) return {...initialData, searchedCity: city};

    const storageBData: BasicData = JSON.parse(storageString);
    return {...storageBData, searchedCity: city};
};

// Do this on first App mount and home URL or DailyForecast URL page refresh
export const findCityFromStorageOrUrl = (pathname: string): BasicData => {
    const storageString: string | null = localStorage.getItem("default-data");
    if (pathname === '/') {
        if (storageString === null) return ({...initialData, ...initialCity});
        const storageBdata: BasicData = JSON.parse(storageString);
        return storageBdata;
    }
    else return findCityFromUrl(pathname, storageString);
};
