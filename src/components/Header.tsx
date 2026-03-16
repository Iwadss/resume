import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
// @ts-expect-error: GlassSurface is missing types
import GlassSurface from "./GlassSurface";

const Header = () => {
    // Access current theme and toggle method
    const { theme, setTheme } = useTheme();

    // Track scroll state
    const [isScrolled, setIsScrolled] = useState(false);

    // Track mobile menu toggle state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Track active section for highlight
    const [activeSection, setActiveSection] = useState("");

    // Navigation links
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
            setIsScrolled(window.scrollY > 20);

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

        const handleClickOutside = (event: MouseEvent) => {
            const header = document.querySelector('header');
            if (isMobileMenuOpen && header && !header.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousedown", handleClickOutside);
        
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousedown", handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobileMenuOpen]);

    // Toggle light/dark theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="fixed top-5 left-0 right-0 z-50 px-5 pointer-events-none">
            {/* Desktop / Tablet Navigation (Pill) */}
            <div className="hidden md:flex justify-center w-full">
                <div className="md:max-w-max w-full">
                    <GlassSurface
                        width="100%"
                        height="auto"
                        borderRadius={9999}
                        borderWidth={0.1}
                        brightness={theme === 'dark' ? 15 : 95}
                        opacity={theme === 'dark' ? 0.7 : 0.8}
                        blur={20}
                        backgroundOpacity={0.05}
                        mixBlendMode="normal"
                        className={`pointer-events-auto w-full transition-all duration-500 ease-in-out ${isScrolled ? "scale-95 shadow-lg" : "scale-100 shadow-none"}`}
                    >
                        <div className="flex items-center justify-between px-2 py-1.5 w-full">
                            {/* Logo */}
                            <a href="#" className="text-xl font-bold tracking-tight pr-6 pl-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Portfolio</span>
                            </a>

                            {/* Desktop Navigation */}
                            <nav className="flex items-center space-x-1">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href.substring(1);
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out group
                                                ${isActive 
                                                    ? "text-white shadow-[0_4px_12px_rgba(124,77,255,0.4)]" 
                                                    : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                                                }`}
                                            style={isActive ? { background: "linear-gradient(90deg, #7C4DFF, #3BA8FF)" } : {}}
                                        >
                                            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px] inline-block">
                                                {link.name}
                                            </span>
                                            {!isActive && (
                                                <span className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                                            )}
                                        </a>
                                    );
                                })}
                            </nav>

                            {/* Theme Toggle */}
                            <div className="flex items-center pl-6">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </GlassSurface>
                </div>
            </div>

            {/* Mobile Navigation (Circular Button) */}
            <div className="md:hidden flex justify-end items-center h-14">
                <div className="pointer-events-auto">
                    <GlassSurface
                        width={52}
                        height={52}
                        borderRadius={9999}
                        borderWidth={0.15}
                        brightness={theme === 'dark' ? 20 : 98}
                        opacity={0.8}
                        blur={15}
                        backgroundOpacity={0.1}
                        className="transition-transform duration-300 active:scale-90"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-full h-full rounded-full text-zinc-600 dark:text-zinc-100 p-0"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <span className={`absolute h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-0' : 'w-6 -translate-y-1.5'}`} />
                                <span className={`absolute h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`} />
                                <span className={`absolute h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-6 -rotate-45 translate-y-0' : 'w-6 translate-y-1.5'}`} />
                            </div>
                        </Button>
                    </GlassSurface>
                </div>
            </div>

            {/* Full Screen Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-[60] bg-gradient-to-br from-[#0b0b1a]/95 via-[#1a0b3a]/98 to-[#0b0b1a]/95 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out pointer-events-auto
                    ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
            >
                {/* Close Button Inside Overlay */}
                <div className="absolute top-5 right-5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 rounded-full text-white/80"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            <span className="absolute h-0.5 w-6 bg-current rotate-45" />
                            <span className="absolute h-0.5 w-6 bg-current -rotate-45" />
                        </div>
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-center h-full space-y-8 px-10">
                    {/* Theme Toggle in Mobile Overlay */}
                    <button 
                        onClick={toggleTheme}
                        className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 text-white/80 animate-in fade-in zoom-in duration-500 delay-100"
                    >
                        {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>

                    {navLinks.map((link, index) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl font-semibold tracking-wide transition-all duration-300
                                    ${isActive 
                                        ? "text-white scale-110" 
                                        : "text-white/60 hover:text-white"
                                    }`}
                                style={{
                                    animation: isMobileMenuOpen ? `mobileLinkIn 0.5s ease-out forwards ${0.3 + index * 0.08}s` : 'none',
                                    opacity: 0,
                                    transform: 'translateY(20px)'
                                }}
                            >
                                <span className={isActive ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400" : ""}>
                                    {link.name}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
            
            <style>{`
                @keyframes mobileLinkIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;