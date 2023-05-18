import React from "react";
import Header from '../Components/Header';
import { LanguageCode } from "../Models/app.data.models";

export interface AppLayoutProps {
    handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
    toggleAsideMenu: () => void;
    showAsideMenu: boolean;
    language: LanguageCode;
    children: React.ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
    const { 
        handleSearchSubmit,
        toggleAsideMenu,
        showAsideMenu,
        language,
        children,
    } = props;

    return (
        <>
            <Header 
                handleSearchSubmit={handleSearchSubmit}
                toggleAsideMenu={toggleAsideMenu}
                showAsideMenu={showAsideMenu}
                language={language}
            />
            <main className={`weather-app`}>
                {children}
            </main>
            <footer>
                    <p>Powered by Pirate Weather's API</p>
                    <p><span>Weather Forecast</span>&ensp;by D.J. &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    );
};
