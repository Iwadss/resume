/**
 * ==============================
 * ⚠️ NOTE: Currently Not in Use
 * ==============================
 * This ModeToggle component is not used in the current version of the project.
 * However, it is retained for future reference or use.
 * You can safely remove this file if dark/light theme toggle is not planned.
 */

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

// ==============================
// ModeToggle Component
// ==============================
// Renders a button to toggle between light and dark themes
// Uses `lucide-react` icons for visual feedback
// Accessible with a screen-reader label
// ==============================

export function ModeToggle() {
    // Access current theme state and setter from custom theme provider
    const { theme, setTheme } = useTheme();

    // Toggle between dark and light mode
    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
        >
            {/* Icon switches depending on current theme */}
            {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}

            {/* Screen reader-only label for accessibility */}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}