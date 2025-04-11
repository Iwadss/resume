import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

// ==============================
// Header Component
// ==============================

const Header = () => {
    // Access current theme and toggle method
    const { theme, setTheme } = useTheme();

    // Track scroll position for sticky effects
    const [isScrolled, setIsScrolled] = useState(false);

    // Track mobile menu toggle state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Detect scroll and update header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle light/dark theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Navigation links
    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
            ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
        >
            {/* Wrapper */}
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">

                {/* Logo */}
                <a href="#" className="text-xl font-bold tracking-tight">
                    <span className="text-primary">Portfolio</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Theme Toggle & Mobile Menu Button */}
                <div className="flex items-center space-x-2">
                    {/* Theme toggle button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Mobile menu toggle button (hamburger/close) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            {isMobileMenuOpen && (
                <nav className="md:hidden px-6 pb-6 pt-2 bg-background/95 backdrop-blur-md rounded-b-lg animate-in fade-in slide-in-from-top-2 space-y-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm rounded-md hover:bg-secondary transition"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
};

export default Header;