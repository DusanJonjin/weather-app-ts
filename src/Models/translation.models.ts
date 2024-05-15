export interface SummaryObj {
    clear: "Vedro",
    cloudy: "Oblačno",
    fog: "Magla",
    partly_cloudy: "Delimično oblačno",
    rain: "Kiša",
    sleet: "Susnežica",
    snow: "Sneg",
    wind: "Vetrovito",
    [key: string]: string;
}

export type Summary = keyof SummaryObj;