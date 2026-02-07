import { PropsWithChildren, useEffect, useState } from "react";
import { ThemeContext, type TTheme } from "../../context/ThemeContext";

export function ThemeProvider({children}: PropsWithChildren) {
    const [theme, setTheme] = useState<TTheme>(() => localStorage.getItem('theme') as TTheme || 'dark')

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}