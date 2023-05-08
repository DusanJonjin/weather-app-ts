export type LanguageCode = "en" | "rs";

export type UnitCode = "ca" | "us";

export interface BasicData {
    searchedCity: string,
    id: string;
    units: UnitCode;
    language: LanguageCode;
}

export interface Language {
    name: "English" | "Srpski";
    code: LanguageCode;
}

export interface Unit {
    name: "Metric" | "US";
    code: UnitCode;
}
