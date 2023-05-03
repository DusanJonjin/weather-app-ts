import { Key } from "../../Hooks/useDefaultData";
import { BasicData } from "../../Models/app.data.models";
import { insertNewCityInUrl } from '../../Utilities/helperFunctions';
import { CityNameID } from '../../Hooks/useBookmarks';
import { Link } from "react-router-dom";

interface BookmarksProps {
    bookmarks: CityNameID[];
    defaultData: BasicData;
    toggleNewValue: (key: Key, value: string, id: string) => void;
    toggleCity: (name: string, id:string) => void;
    handleCityChange: (newValue: string) => void;
    pathname: string;
    isHomeUrl: boolean;
    bmarksHeading: string;
}

export const Bookmarks = (props: BookmarksProps) => {
    const { 
        bookmarks,
        defaultData, 
        toggleNewValue, 
        toggleCity, 
        handleCityChange,
        pathname,
        isHomeUrl,
        bmarksHeading
    } = props;

    const { id } = defaultData;

    return (
        <section className='bookmarked-cities'>
            <h2>{bmarksHeading}</h2>
            <div className='bm-cities-wrap'>
                {bookmarks.map(bookmark =>
                    <article key={bookmark.id} id="bookmark">
                        <h3>
                            <Link to={`${isHomeUrl ? "/" : insertNewCityInUrl(bookmark.name, pathname)}`}
                                className='link'
                                onClick={() => handleCityChange(bookmark.name)}
                            >
                                {bookmark.name}
                            </Link>
                        </h3>
                        <div>
                            <button onClick={() => toggleNewValue("searchedCity", bookmark.name, bookmark.id)}
                                title="Set as default"
                                className={`default ${bookmark.id === id ? "checked" : ""}`}>
                                {'\u2713'}
                            </button>
                            <button onClick={() => toggleCity(bookmark.name, bookmark.id)}
                                title="Remove bookmark"
                                id="remove">
                            {'\u2715'}
                            </button>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
