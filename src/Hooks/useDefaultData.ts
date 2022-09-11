import { useState, useLayoutEffect } from "react";
import { BasicData } from "../Models/app.data.models";
import { City } from '../Hooks/useBookmarks';

export type Key = "" | "searchedCity" | "language" | "units";

interface NewValue {
    key: Key;
    value: string;
    id: string;
    toggle: boolean;
}

export const useDefaultData = (basicData: BasicData, city: City) => {

    const [newValue, setNewValue] = useState<NewValue>({key: "", value: "", id: "", toggle: false});

    const { key, value, id, toggle } = newValue;

    const [defaultData, setDefaultData] = useState<BasicData>(() => {
        const storageDefaultString = localStorage.getItem("default-data");
        if (storageDefaultString === null) return basicData;
        const storageDefault: BasicData = JSON.parse(storageDefaultString);
        return storageDefault;
    });

    const toggleNewValue = (key: Key, value: string, id: string = "") => {
        setNewValue(prevValue => (
            {
                key,
                value, 
                id: key === "searchedCity" ? id : prevValue.id, 
                toggle: !prevValue.toggle}
        ));
    };

    const isDefault = key !== "" && defaultData[key] === value;

    const isBmarkedAndDefault = defaultData.id !== "" && defaultData.id === city.id;

    const initialCity = {
        searchedCity: "Belgrade", 
        id: "274920360"
    };

    useLayoutEffect(() => {
        if (key && value) {
            if (!isDefault) {
                const newData = key === "searchedCity" 
                    ? {...defaultData, [key]: value, id} 
                    : {...defaultData, [key]: value}
                ;
                const newDefaultData = JSON.stringify(newData);
                localStorage.setItem("default-data", newDefaultData);
                setDefaultData(prevDefData => (
                    key === "searchedCity" 
                    ? { ...prevDefData, [key]: value, id }
                    : { ...prevDefData, [key]: value }
                ));
            }
        }
    }, [toggle]);

    useLayoutEffect(() => {
        if (city && isBmarkedAndDefault) {
            const newData = {...defaultData, ...initialCity};
            const newDefaultData = JSON.stringify(newData);
            localStorage.setItem("default-data", newDefaultData)
            setDefaultData(prevDefData => ({...prevDefData, ...initialCity}));
        }
    },[city.toggle])

    return ({ toggleNewValue, defaultData });
}