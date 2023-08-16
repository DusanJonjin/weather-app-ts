import { useEffect } from "react";

export const useBodyClassToggle = (className: string, toggleValue: boolean) => {

    useEffect(() => {
        document.body.classList.toggle(className, toggleValue);
    }, [toggleValue])

    return null;
}