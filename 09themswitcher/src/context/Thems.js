import { createContext, useContext } from "react";

export const ThemeContext = createContext(
    {
        themMode : "light" ,
        darkTheme: () => {},   
        lightTheme: () => {}   
    }
)

export const dogImages = {
    light: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    dark: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg"
}
export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}