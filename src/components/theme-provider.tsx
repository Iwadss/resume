// ==============================
// File: components/theme-provider.tsx
// ==============================
// Provides global theme context and utilities to toggle between
// "light", "dark", or "system" (auto) mode.
// Automatically syncs with localStorage and updates <html> classes.
// Wrap your app with <ThemeProvider> to enable theme switching.
// ==============================

import { createContext, useContext, useEffect } from "react";

// ==============================
// Type Definitions
// ==============================

// Since the app is dark mode only, the theme is strictly "dark"
type Theme = "dark";

// Props passed to the <ThemeProvider /> component
type ThemeProviderProps = {
    children: React.ReactNode;       
    defaultTheme?: string;           
    storageKey?: string;            
};

// Internal context structure
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

// ==============================
// Context Initialization
// ==============================

const initialState: ThemeProviderState = {
    theme: "dark",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// ==============================
// ThemeProvider Component
// ==============================

export function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    // Force dark mode globally on mount
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light");
        root.classList.add("dark");
    }, []);

    const value = {
        theme: "dark" as Theme,
        setTheme: () => null, // No-op since we only have dark mode
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

// ==============================
// useTheme Hook
// ==============================
// Access current theme state and toggle method
// Must be used inside a ThemeProvider wrapper
// ==============================

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};