import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { popularCities, header } from '../Fixtures/miscData';
import { Languages } from "../Models/app.data.models";

interface HeaderProps {
    handleSearchSubmit: (
        e: React.FormEvent<HTMLFormElement>, 
        inputRef: React.MutableRefObject<HTMLInputElement | null>
    ) => void
    toggleAsideMenu: () => void;
    showAsideMenu: boolean;
    language: Languages;
}

const Header = (props: HeaderProps) => {
    const { 
        handleSearchSubmit,
        toggleAsideMenu,
        showAsideMenu,
        language
    } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const [showSuggestions, setShowSuggestions] = useState(true);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { pathname } = useLocation();

    const isHomeUrl = pathname === '/';

    const searchSuggestions = popularCities.reduce<JSX.Element[]>((acc, city) => 
        inputValue && city.toLowerCase().startsWith(inputValue.toLowerCase()) 
            ? [...acc, 
                <button key={city} type="submit" onClick={() => setInputValue(city)}>
                    {city}
                </button>] 
            : acc 
    , []);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        setShowSuggestions(true);
    };

    return(
        <header id='header'>
            <h1><img src={"/Images/icon.png"} alt='weather_app_icon'/>
                Weather Forecast
            </h1>

            <form onSubmit={e => (handleSearchSubmit(e, inputRef), setShowSuggestions(false))} 
                  className={isHomeUrl ? '' : 'hide'}
            >
                <input type='search'  
                       placeholder={`${header.input[language]}...`}
                       ref={inputRef}
                       onChange={e => handleInputChange(e)}
                       value={inputValue} 
                />
                <div>
                    {showSuggestions ? searchSuggestions : <></>}
                </div>
                <button id="search-button" type='submit'>{header.button[language]}</button>
            </form>
            <div className={`back ${isHomeUrl ? 'hide' : ''}`}>
                <Link to='/' className='link'>
                    &#8618; ☼ {header.backLink[language]}
                </Link>
            </div>
            <div className='hamburger-wrap' onClick={() => toggleAsideMenu()}>
                <div className={`hamburger ${showAsideMenu ? 'hamb-open' : ''}`}></div>
            </div>
        </header>
    );
}

export default Header;