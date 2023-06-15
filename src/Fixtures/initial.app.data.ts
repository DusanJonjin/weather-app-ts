import { BasicData } from "../Models/app.data.models";
import { LanguageCode } from "../Models/app.data.models";

export const initialBasicData: BasicData = {
    searchedCity: "",
    id: "",
    units: "ca",
    language: "en",
};

export const initialCity = {
    searchedCity: "Belgrade", 
    id: "274920360"
};

export const languagesList: LanguageCode[] = ["en", "rs"];