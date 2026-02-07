import { createContext } from "react";

export type TTheme = 'light' | 'dark'

export interface IThemeContext {
    theme: TTheme,
    toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)