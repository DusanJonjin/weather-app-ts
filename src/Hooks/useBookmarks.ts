import { useLayoutEffect, useState} from "react";

export interface City {
    name: string,
    id: string,
    toggle: boolean
}

export type CityNameID = Omit<City, "toggle">;

export interface BookmarksValues {
    bookmarks: CityNameID[];
    city: City;
    toggleCity: (name: string, id: string) => void;
    isBookmarked: boolean;
}

export const useBookmarks = (): BookmarksValues => {

    const [city, setCity] = useState<City>({name: "", id: "", toggle: false});

    const { name, toggle, id } = city;

    const [bookmarks, setBookmarks] = useState<CityNameID[]>(() => {
        const storageBookmarks = localStorage.getItem("bookmarks");
        if (storageBookmarks === null) return [];
        const allBookmarks = JSON.parse(storageBookmarks);
        return allBookmarks;
    });

    const toggleCity = (name: string, id: string) => {
        setCity(prevCity => ({name, id, toggle: !prevCity.toggle}));
    };

    const isBookmarked: boolean = !!bookmarks.find(bookmark => bookmark.id === id);

    useLayoutEffect(() => {
        if (!name && !toggle) return;
        if (name) {
            if (!isBookmarked) {
                const newStorageBookmarks = JSON.stringify([...bookmarks, {name, id}]);
                localStorage.setItem("bookmarks", newStorageBookmarks);
                setBookmarks(prevBookmarks => [...prevBookmarks, {name, id}]);
            }
            else {
                const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
                const newStorageBookmarks = JSON.stringify(newBookmarks);
                localStorage.setItem("bookmarks", newStorageBookmarks);
                setBookmarks(prevBookmarks => 
                    prevBookmarks.filter(bookmark => bookmark.id !== id)
                );
            }
        }
    }, [toggle])

    return (
        {
            bookmarks,
            city,
            toggleCity,
            isBookmarked
        }
    );
};
