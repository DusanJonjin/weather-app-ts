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
    handleNewCity: (newValue: string) => void;
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
        handleNewCity,
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
                                onClick={() => handleNewCity(bookmark.name)}
                            >
                                {bookmark.name}
                            </Link>
                        </h3>
                        <div>
                            <p onClick={() => toggleNewValue("searchedCity", bookmark.name, bookmark.id)}
                                className={`default ${bookmark.id === id ? "checked" : ""}`}>
                                {'\u2713'}
                            </p>
                            <p onClick={() => toggleCity(bookmark.name, bookmark.id)}
                                id="remove">
                            {'\u2715'}
                            </p>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
