import { useLayoutEffect } from 'react';

export const useScrollToTop = (pathname: string, showAsideMenu: boolean): null => {

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, showAsideMenu]);

    return null;
}