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

    // Track scroll progress (0 = top, 1 = fully scrolled effect)
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track mobile menu toggle state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Track active section for highlight
    const [activeSection, setActiveSection] = useState("");

    // Navigation links (defined outside useEffect to avoid missing dep)
    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Certifications", href: "#certifications" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Normalize scroll to a 0–1 progress value (fully triggered by 150px)
            const progress = Math.min(window.scrollY / 150, 1);
            setScrollProgress(progress);

            // Active section tracking
            let current = "";
            for (const link of navLinks) {
                const section = link.href.substring(1);
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 100) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Toggle light/dark theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Dynamic inline styles driven by scroll progress
    const pillStyle: React.CSSProperties = {
        // Background becomes more opaque as you scroll
        background: `rgba(11, 11, 26, ${0.3 + scrollProgress * 0.45})`,
        // Border becomes brighter
        borderColor: `rgba(255, 255, 255, ${0.08 + scrollProgress * 0.12})`,
        // Outer glow intensifies
        boxShadow: `
            inset 1px 1px 0 rgba(255, 255, 255, ${0.06 + scrollProgress * 0.08}),
            0 0 ${20 + scrollProgress * 30}px rgba(139, 92, 246, ${0.2 + scrollProgress * 0.35}),
            0 ${4 + scrollProgress * 8}px ${16 + scrollProgress * 24}px rgba(0, 0, 0, ${0.2 + scrollProgress * 0.2})
        `,
        // Slight vertical shrink on scroll
        paddingTop: `${10 - scrollProgress * 2}px`,
        paddingBottom: `${10 - scrollProgress * 2}px`,
    };

    return (
        <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full max-w-[90%] md:max-w-max pointer-events-none">
            {/* Pill Container */}
            <div
                className="pointer-events-auto flex items-center justify-between px-4 rounded-full w-full backdrop-blur-xl border border-white/10 transition-[box-shadow,padding,background] duration-500 ease-out"
                style={pillStyle}
            >
                {/* Logo */}
                <a href="#" className="text-xl font-bold tracking-tight pr-6 pl-2 hidden lg:block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-primary">Portfolio</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ease-out group
                                    ${isActive 
                                        ? "text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
                                        : "text-gray-300 hover:text-white"
                                    }`}
                                style={isActive ? { background: "linear-gradient(135deg, #7c3aed, #9333ea)" } : {}}
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px] inline-block">
                                    {link.name}
                                </span>
                                {/* Hover background pill */}
                                {!isActive && (
                                    <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* Theme Toggle & Mobile Menu Button */}
                <div className="flex items-center pl-2 md:pl-6 space-x-2">
                    {/* Theme toggle button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Mobile menu toggle button (hamburger/close) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden rounded-full hover:bg-white/10 text-gray-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 pointer-events-auto">
                    <nav className="flex flex-col p-4 bg-[#0b0b1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(139,92,246,0.2)] animate-in fade-in slide-in-from-top-4 space-y-2">
                        {navLinks.map((link) => {
                             const isActive = activeSection === link.href.substring(1);
                             return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors
                                        ${isActive 
                                            ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white" 
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </a>
                             );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;