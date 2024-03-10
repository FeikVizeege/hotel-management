"use client";

import { useEffect, useRef, useState } from "react";
import ThemeContext from "@/context/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    
    const themeFromStorage: boolean =
        typeof localStorage !== "undefined" &&
        localStorage.getItem("hotel-theme")
            ? JSON.parse(localStorage.getItem("hotel-theme")!)
            : false;

    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
    const [renderComponent, setRenderComponent] = useState(false);

    // Now it won't again...
    const waitingRender = () => {
        setRenderComponent(true);
    }
    
    useEffect(() => {
        waitingRender();
    }, [renderComponent]);

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
                <div className="dark:text-white dark:bg-black text-[#1E1E1E]">
                    {children}
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
