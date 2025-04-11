// ==============================
// File: pages/Index.tsx
// ==============================
// Main entry point for the homepage layout.
// Wraps all sections inside a global ThemeProvider,
// including Header, Hero, About, Skills, Projects, Contact, and Footer.
// ==============================

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// ==============================
// Index Page Component
// ==============================

const Index = () => {
    return (
        // Provides light/dark theme context to the entire app
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="relative">

                {/* Global Navigation Header */}
                <Header />

                {/* Main Page Content */}
                <main className="pt-16 scroll-smooth md:scroll-auto">
                    {/* Section Order */}
                    <Hero />      {/* Hero / Introduction */}
                    <About />     {/* About Me Section */}
                    <Skills />    {/* Skills & Technologies */}
                    <Projects />  {/* Featured Projects */}
                    <Contact />   {/* Contact Information & Map */}
                </main>

                {/* Footer with social links and copyright */}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Index;