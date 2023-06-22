import { DaysEN, DaysRS, MonthsEN, MonthsRS } from "../Models/date.models";

export const messages = {
    loading: {
        en: "Loading weather data. \nPlease wait...",
        rs: "Podaci o vremenu se učitavaju. \nMolim Vas sačekajte..."
    },
    searching: {
        en: `Searching for weather data. \nPlease wait...`,
        rs: "Podaci o vremenu se traže. \nMolim Vas sačekajte...",
    },
    settingsChange: {
        en: "Applying settings changes. \nPlease wait...",
        rs: "Promene u podešavanjima se primenjuju. \nMolim Vas sačekajte...",
    },
    badHomeUrl: {
        en: "Refresh the browser or enter a new search, to see the current weather data and forecast.",
        rs: "Osvežite pregledač ili unesite novu pretragu da bi ste videli trenutno vreme i prognozu.",
    },
    badUrl: {
        en: "Invalid URL. Enter a new search, or go back to the weather home page and refresh the browser.",
        rs: "Neispravan URL. Unesite novu pretragu, ili se vratite na početnu stranicu i osvežite pregledač.",
    },
    badHomeSearch: {
        en: "The place you have entered cannot be found, or it doesn\'t exist. Enter a new search or refresh the browser for real weather data.",
        rs: "Mesto koje ste uneli ne može da se pronađe ili ne postoji. Unesite novu pretragu ili osvežite pregledač za stvarne podatke o vremenu."
    },
    badUrlSearch: {
        en: "You have entered invalid place name. Go to the home page and enter a new search value, or refresh the browser for any city\'s weather.",
        rs: "Uneli ste neispravan naziv mesta. Idite na početnu stranicu i unesite novu pretragu, ili osvežite pregledač za vreme bilo kojeg mesta.",
    },
    badDate: {
        en: "Weather forecast for chosen date doesn\'t exist. Go back to the home page and choose another date.",
        rs: "Vremenska prognoza za izabrani datum ne postoji. Vratite se na početnu stranicu i izaberite neki drugi datum.",
    },
    networkError: {
        en: "Network error. \nPlease try again later.",
        rs: "Greška na mreži. \nMolim Vas pokušajte kasnije.",
    },
    minLetters: {
        en: "At least two letters are required to display the search result!",
        rs: "Potrebno je uneti najmanje dva slova da bi se prikazao rezultat pretrage!",
    }
};

// Aside Menu labels translation objects:
export const bookmarksLabels =  {
    heading: {
        en: "Bookmarked places",
        rs: "Obeležena mesta",
    },
    default: {
        en: "Set as default",
        rs: "Postaviti kao podrazumevano",
    },
    remove: {
        en: "Remove bookmark",
        rs: "Ukloniti iz obeleženih",
    },
    empty: {
        en: "No bookmarks yet",
        rs: "Nema obeleženih mesta",
    }
};

export const popCitiesLabels =  {
    en: "Popular cities",
    rs: "Popularni gradovi",
};

export const settingsLabels = {
    main: {
        en: "Settings",
        rs: "Podešavanja",
    },
    language: {
        en: "Language",
        rs: "Jezik",
    },
    units: {
        en: "Units",
        rs: "Jedinice",
    },
};

export const otherDetails = {
    pressureName: {en: "Pressure", rs: "Pritisak"},
    humidityName: {en: "Humidity", rs: "Vlažnost"},
    windSpeedName: {en: "Wind speed", rs: "Brzina vetra"},
    uvIndexName: {en: "UV index", rs: "UV indeks"},
    visibilityName: {en: "Visibility", rs: "Vidljivost"},
    ozoneName: {en: "Ozone", rs: "Ozon"},
    cloudCoverName: {en: "Cloud cover", rs: "Oblačnost"},
    windDirectionName: {en: "Wind direction", rs: "Smer vetra"}
}

export const hourlyFcast = {
    en: "Hourly forecast",
    rs: "Prognoza po času"
};

export const sevenDaysFcast = {
    en: "7 days forecast",
    rs: "Prognoza za 7 dana"
};

export const temp = {
    low: {
        en: "Low",
        rs: "Najniže",
    },
    high: {
        en: "High",
        rs: "Najviše",
    }
};

export const header = {
    input: {
        en: "Enter a place name",
        rs: "Unesite naziv mesta",
    },
    button: {
        en: "Search",
        rs: "Pretraži",
    },
    backLink: {
        en: "Home (Current weather)",
        rs: "Početna (Trenutno vreme)",
    }
};

// Translation object used for different units options 
export const unitsName = {
    temp: {
        ca: "°C",
        us: "°F",
    },
    speed: {
        ca: "km/h",
        us: "mph",
    },
    distance: {
        ca: "km",
        us: "mi",
    }
};

// Translation objects used for dates
export const days: {en: DaysEN; rs: DaysRS}[] = [
    {en: "Monday", rs: "Ponedeljak"},
    {en: "Tuesday", rs: "Utorak"},
    {en: "Wednesday", rs: "Sreda"},
    {en: "Thursday", rs: "Četvrtak"},
    {en: "Friday", rs: "Petak"},
    {en: "Saturday", rs: "Subota"},
    {en: "Sunday", rs: "Nedelja"},
]

export const months: {en: MonthsEN, rs: MonthsRS}[] =[
    {en: "January", rs: "Januar"},
    {en: "February", rs: "Februar"},
    {en: "March", rs: "Mart"},
    {en: "April", rs: "April"},
    {en: "May", rs: "Maj"},
    {en: "June", rs: "Jun"},
    {en: "July", rs: "Jul"},
    {en: "August", rs: "Avgust"},
    {en: "September", rs: "Septembar"},
    {en: "October", rs: "Oktobar"},
    {en: "November", rs: "Novembar"},
    {en: "December", rs: "Decembar"},
];