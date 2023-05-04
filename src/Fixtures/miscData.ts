export const messages = {
    loading:  'Loading weather data. \nPlease wait...',
    searching:  `Searching for entered city\'s weather data. \nPlease wait...`,
    badHomeUrl:  'Refresh the browser or enter a new search, to see the current weather data and forecast.',
    badUrl:  'Invalid URL. Enter a new search, or go back to the weather home page and refresh the browser.',
    badHomeSearch:  'The city you have entered cannot be found, or it doesn\'t exist. Enter a new search or refresh the browser for real weather data.',
    badUrlSearch:  'You have entered invalid city name. Go to the home page and enter a new search value, or refresh the browser for any city\'s weather.',
    badDate:  'Weather forecast for chosen date doesn\'t exist. Go back to the home page and choose another date.',
    networkError:  'Network error. \nPlease try again later.',
    minLetters: 'At least two letters are required to display the search result!',
    settingsChange: 'Applying settings changes. \nPlease wait...',
};

export const popularCities = [
    "Belgrade",
    "Athens",
    "Istanbul",
    "Rome",
    "Budapest",
    "Vienna",
    "Madrid",
    "Lisbon",
    "Paris",
    "Berlin",
    "Prague",
    "Moscow",
    "London",
    "Amsterdam",
    "Copenhagen",
    "Oslo",
    "Stockholm",
    "Brussels",
    "New York",
    "Chicago",
    "Dallas",
    "Los Angeles",
    "Mexico City",
    "Havana",
    "Rio de Janeiro",
    "Buenos Aires",
    "Shanghai",
    "Hong Kong",
    "Peking",
    "New Delhi",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Manila",
    "Sydney",
    "Melbourne",
    "Auckland",
    "Cairo",
    "Cape Town",
    "Dubai",
];


// Translation objects used for multiple language options in different components
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
