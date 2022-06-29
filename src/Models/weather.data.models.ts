interface SharedData {
    time: number,
    summary: string,
    icon: string,
    humidity: number,
    pressure: number,
    windSpeed: number,
    uvIndex: number,
}

interface HourlyDaily {
    summary: string,
    icon: string,
}

export interface Currently extends SharedData {
    temperature: number,
    summary: string;
    [key: string]: number | string
}

export interface DayData extends SharedData {
    temperatureMin: number,
    temperatureMax: number,
    [key: string]: number | string,
}

export interface Daily extends HourlyDaily {
    data: DayData[],
}

export interface HourData {
    time: number,
    icon: string,
    temperature: number,
    [key: string]: number | string | undefined,
}

export interface Hourly extends HourlyDaily {
    data: HourData[],
}

export interface WeatherData {
    city: string,
    country: string,
    latitude: number
    longitude: number,
    timezone: string,
    currently: Currently,
    hourly: Hourly,
    daily: Daily,
}


