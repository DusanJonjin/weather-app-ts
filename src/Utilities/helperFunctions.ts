import { BasicData } from "../WeatherApp";

export const dayDate = (time: number, options: {[key:string]: string | boolean}): string => (
    new Date(time * 1000).toLocaleDateString('en', options)
);


interface dateObj {
    day: string,
    date: string,
    year: string,
    localTime: string
}

export const dateObj = (time: number, timezone?: string): dateObj => {
    const completeDateString: string = new Date(time * 1000).toLocaleDateString('en',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timezone
        }
    );

   //Web browsers don't return the same Locale string for the date
    const completeDateArr: string[] = completeDateString.split(', ');

    const day = completeDateArr[0];
    const dateUSA = completeDateArr[1];

    const dateUSAarr: string[] = dateUSA.split(' ');
    const date = `${dateUSAarr[1]} ${dateUSAarr[0]}`

    let year: string;
    let localTime: string;

    if (completeDateArr.length < 4) {
        const yearAndTimeArr: string[] = completeDateArr[2].split(' ');
        year = yearAndTimeArr[0];
        localTime = yearAndTimeArr[2];
    }
    else {
        year = completeDateArr[2];
        localTime = completeDateArr[3]
    }

    return {
        day, date, year, localTime
    }
};


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
}

// Do this on first App mount and home URL or DailyForecast URL page refresh
export const findCityFromStorageOrUrl = (pathname: string): BasicData => {
    const storageString: string | null = localStorage.getItem("default-data");
    if (pathname === '/') {
        if (storageString === null) return (
            {...initialData, searchedCity: "Belgrade"}
        );
        const storageBdata: BasicData = JSON.parse(storageString);
        return storageBdata;
    }
    else return findCityFromUrl(pathname, storageString);
};
