import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface useScrollToTop {
    pathname: string
}

export const useScrollToTop = (): useScrollToTop => {

    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return { pathname };
}