import { DaysEN, DaysRS, MonthsEN, MonthsRS } from "../Models/date.models";

export const asideMenu = {
    bmarks: {
        en: "Bookmarked places",
        rs: "Obeležena mesta"
    },
    popCities: {
        en: "Popular cities",
        rs: "Popularni gradovi"
    },
    sett: {
        en: "Settings",
        rs: "Podešavanja"
    },
    settLang: {
        en: "Language",
        rs: "Jezik",
    },
    settUnits: {
        en: "Units",
        rs: "Jedinice"
    }
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
        rs: "Najniže"
    },
    high: {
        en: "High",
        rs: "Najviše"
    }
};

export const header = {
    input: {
        en: "Enter a town name",
        rs: "Unesite ime naselja"
    },
    button: {
        en: "Search",
        rs: "Pretraži"
    },
    backLink: {
        en: "Home (Current weather)",
        rs: "Početna (Trenutno vreme)"
    }
};

// Translation object used for different units options 
export const unitsName = {
    temp: {
        ca: "°C",
        us: "°F"
    },
    speed: {
        ca: "km/h",
        us: "mph"
    },
    distance: {
        ca: "km",
        us: "mi"
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