import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { header, popularCities } from "../Fixtures/translation.objects";
import { AppLayoutProps } from "../App/AppLayout";

type HeaderProps = Omit<AppLayoutProps, "children">;

const Header = (props: HeaderProps) => {
    const { 
        handleSearchSubmit,
        toggleAsideMenu,
        showAsideMenu,
        language
    } = props;

    const [inputValue, setInputValue] = useState<string>("");

    const [showSuggestions, setShowSuggestions] = useState(true);

    const { pathname } = useLocation();

    const isHomeUrl = pathname === "/";

    const searchSuggestions = popularCities[language].reduce<JSX.Element[]>((acc, city) => 
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
        <header id="header">
            <h1>
                <img src={"/Images/icon.png"} alt="weather_app_icon"/>
                Weather Forecast
            </h1>
            <form 
                onSubmit={e => (handleSearchSubmit(e, inputValue), setShowSuggestions(false))} 
                className={isHomeUrl ? "" : "hide"}
            >
                <input 
                    type="search"  
                    placeholder={`${header.input[language]}...`}
                    onChange={e => handleInputChange(e)}
                    value={inputValue} 
                />
                <button id="search-button" type="submit">{header.button[language]}</button>
                <div>
                    {showSuggestions ? searchSuggestions : <></>}
                </div>
            </form>
            <div className={`back ${isHomeUrl ? "hide" : ""}`}>
                <Link to="/" className="link">
                   &lt;&ensp;{header.backLink[language]}
                </Link>
            </div>
            <div 
                className="hamburger-wrap" 
                onClick={() => toggleAsideMenu()}
            >
                <div className={`hamburger ${showAsideMenu ? "hamb-open" : ""}`}></div>
            </div>
        </header>
    );
}

export default Header;