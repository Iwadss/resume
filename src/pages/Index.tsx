// ==============================
// File: pages/Index.tsx
// ==============================
// Main entry point for the homepage layout.
// Wraps all sections inside a global ThemeProvider,
// including Header, Hero, About, WorkExperience, Skills,
// EnterpriseProjects, Certifications, Methodologies, Projects, Contact, and Footer.
// ==============================

import { ThemeProvider, useTheme } from "@/components/theme-provider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// @ts-expect-error: LightRays is missing types
import LightRays from "@/components/LightRays";

// ==============================
// Background Layer Component
// ==============================
const BackgroundLayer = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            <LightRays
                raysOrigin="top-left"
                raysColor={theme === 'dark' ? '#4c1d95' : '#7dd3fc'}
                raysSpeed={0.15}
                rayLength={1.8}
                lightSpread={1.2}
                mouseInfluence={0.05}
                followMouse={true}
            />
        </div>
    );
};

// ==============================
// Index Page Component
// ==============================
const Index = () => {
    return (
        // Provides light/dark theme context to the entire app
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500">
                {/* Global Background Animation */}
                <BackgroundLayer />

                {/* Floating Navigation Header — fixed position, overlays all sections */}
                <Header />

                {/* Main Page Content */}
                <main className="scroll-smooth md:scroll-auto relative z-10">
                    <Hero />
                    <About />
                    <WorkExperience />
                    <Projects />
                    <Skills />
                    <Certifications />
                    <Contact />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Index;