import {
    Github,
    Linkedin,
    Instagram,
    Mail,
} from "lucide-react";

// ==============================
// Footer Component
// ==============================

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Social media and contact links
    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/Iwadss",
            icon: <Github className="h-5 w-5" />,
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/ifwad/",
            icon: <Linkedin className="h-5 w-5" />,
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/mfwd.docx/",
            icon: <Instagram className="h-5 w-5" />,
        },
        {
            name: "Email",
            href: "mailto:iwadss99@gmail.com",
            icon: <Mail className="h-5 w-5" />,
        },
    ];

    return (
        <footer className="bg-secondary py-10 px-6 md:px-12 lg:px-20 border-t border-border">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* =====================
                    TOP SECTION: Branding + Social
                ====================== */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand Name + Title */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold">Muhammad Ifwad Bin Ismail</h2>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="p-2 rounded-full hover:bg-background/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* =====================
                    BOTTOM SECTION: Copyright + Nav
                ====================== */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-border pt-6 text-sm text-muted-foreground gap-4">

                    {/* Copyright */}
                    <p>© {currentYear} Muhammad Ifwad Bin Ismail. All rights reserved.</p>

                    {/* Footer Navigation */}
                    <nav className="flex flex-wrap gap-4">
                        <a href="#about" className="hover:text-primary transition">About</a>
                        <a href="#skills" className="hover:text-primary transition">Skills</a>
                        <a href="#projects" className="hover:text-primary transition">Projects</a>
                        <a href="#contact" className="hover:text-primary transition">Contact</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;