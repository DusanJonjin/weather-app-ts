export interface SummaryObj {
    "Clear": "Vedro",
    "Cloudy": "Oblačno",
    "Fog": "Magla",
    "Partly Cloudy": "Delimično oblačno",
    "Rain": "Kiša",
    "Sleet": "Susnežica",
    "Snow": "Sneg",
    "Wind": "Vetrovito",
    [key: string]: string;
}

export type Summary = keyof SummaryObj;