import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
    handleSearchSubmit: (
        e: React.FormEvent<HTMLFormElement>, 
        inputRef: React.MutableRefObject<HTMLInputElement | null>
    ) => void
}

const Navbar = (props: NavbarProps) => {

    const { handleSearchSubmit } = props;

    const location = useLocation();

    const inputRef = useRef<HTMLInputElement | null>(null)

    const { pathname } = location;

    const isHomeUrl = pathname === '/';

    return(
        <nav id='navbar'>
            <p><img src={"/Images/icon.png"} alt='weather_app_icon'/>
                Weather Forecast
            </p>
            <form onSubmit={e => handleSearchSubmit(e, inputRef)} 
                  style={isHomeUrl ? {display: 'flex'} : {display:'none'}}
            >
                <input type='search'  
                       placeholder='Enter a city name...'
                       ref={inputRef} />
                <input id='button' type='submit' value='Search' />
            </form>
            <div className={`back ${isHomeUrl && 'hide'}`}>
                <Link to='/' className='link'>
                    &#8618; ☼ Home page
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;