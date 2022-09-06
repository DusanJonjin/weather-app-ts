import { Key } from "../../Hooks/useDefaultData";
import { BasicData } from "../../WeatherApp";
import { insertNewCityInUrl } from '../../Utilities/helperFunctions';
import { CityNameID } from '../../Hooks/useBookmarks';
import { Link } from "react-router-dom";

interface BookmarksProps {
    bookmarks: CityNameID[];
    defaultData: BasicData;
    toggleNewValue: (key: Key, value: string, id: string) => void;
    toggleCity: (name: string, id:string) => void;
    handleNewCity: (newValue: string) => void;
    pathname: string;
    isHomeUrl: boolean;
}

export const Bookmarks = (props: BookmarksProps) => {
    const { 
        bookmarks,
        defaultData, 
        toggleNewValue, 
        toggleCity, 
        handleNewCity,
        pathname,
        isHomeUrl
    } = props;

    const { searchedCity } = defaultData;

    return (
        <section className='bookmarked-cities'>
            <h2>Bookmarked cities</h2>
            <div className='bm-cities-wrap'>
                {bookmarks.map(bookmark =>
                    <article key={bookmark.id}>
                        <h3 onClick={() => handleNewCity(bookmark.name)}>
                            <Link to={`${isHomeUrl ? "/" : insertNewCityInUrl(bookmark.name, pathname)}`}
                                className='link'
                            >
                                {bookmark.name}
                            </Link>
                        </h3>
                        <p onClick={() => toggleNewValue("searchedCity", bookmark.name, bookmark.id)}>
                            default
                        </p>
                        <p onClick={() => toggleCity(bookmark.name, bookmark.id)}>
                            remove
                        </p>
                    </article>
                )}
            </div>
        </section>
    );
}
