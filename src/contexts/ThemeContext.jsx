import { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para usar el contexto
export const useTheme = () => useContext(ThemeContext);