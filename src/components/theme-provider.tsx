// ==============================
// File: components/theme-provider.tsx
// ==============================
// Provides global theme context and utilities to toggle between
// "light", "dark", or "system" (auto) mode.
// Automatically syncs with localStorage and updates <html> classes.
// Wrap your app with <ThemeProvider> to enable theme switching.
// ==============================

import { createContext, useContext, useEffect, useState } from "react";

// ==============================
// Type Definitions
// ==============================

// Enum-like theme types available in the app
type Theme = "dark" | "light" | "system";

// Props passed to the <ThemeProvider /> component
type ThemeProviderProps = {
    children: React.ReactNode;       // Nested React components
    defaultTheme?: Theme;           // Fallback theme if none stored
    storageKey?: string;            // Key used in localStorage
};

// Internal context structure to store theme state and setter
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

// ==============================
// Context Initialization
// ==============================

// Fallback state if ThemeProvider is not wrapped properly
const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

// Create global Theme Context
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// ==============================
// ThemeProvider Component
// ==============================

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    // Load stored theme or fallback to default
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    // Sync theme with <html> class and listen for system changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Ensure clean slate before applying
        root.classList.remove("light", "dark");

        if (theme === "system") {
            // Detect system theme preference
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);

            // Automatically update on system theme changes
            const handleSystemThemeChange = (event: MediaQueryListEvent) => {
                root.classList.remove("light", "dark");
                root.classList.add(event.matches ? "dark" : "light");
            };

            // Listen to OS-level changes
            const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQueryList.addEventListener("change", handleSystemThemeChange);

            // Cleanup listener on unmount
            return () => {
                mediaQueryList.removeEventListener("change", handleSystemThemeChange);
            };
        } else {
            // Apply manually selected theme
            root.classList.add(theme);
        }
    }, [theme]);

    // Context value to provide globally
    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme); // Persist theme choice
            setTheme(theme);                         // Update state
        },
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