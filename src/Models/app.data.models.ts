export type Languages = "en" | "rs";

export const languagesList: Languages[] = ["en", "rs"];


export type Units = "ca" | "us";

export const unitsList: Units[] = ["ca", "us"];


export interface BasicData {
    searchedCity: string,
    id: string;
    units: Units;
    language: Languages;
}

