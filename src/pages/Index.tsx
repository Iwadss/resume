// ==============================
// File: pages/Index.tsx
// ==============================
// Main entry point for the homepage layout.
// Wraps all sections inside a global ThemeProvider,
// including Header, Hero, About, WorkExperience, Skills,
// EnterpriseProjects, Certifications, Methodologies, Projects, Contact, and Footer.
// ==============================

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// ==============================
// Index Page Component
// ==============================

const Index = () => {
    return (
        // Provides light/dark theme context to the entire app
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="relative">

                {/* Floating Navigation Header — fixed position, overlays all sections */}
                <Header />

                {/* Main Page Content */}
                <main className="scroll-smooth md:scroll-auto">
                    {/* Hero — no reveal animation, visible immediately */}
                    <Hero />

                    {/* About Me */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <About />
                    </ScrollReveal>

                    {/* Work Experience */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <WorkExperience />
                    </ScrollReveal>

                    {/* Featured Projects */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <Projects />
                    </ScrollReveal>

                    {/* Skills & Technologies */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <Skills />
                    </ScrollReveal>

                    {/* Certifications */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <Certifications />
                    </ScrollReveal>

                    {/* Contact */}
                    <ScrollReveal animation="fade-up" delay={0} duration={700}>
                        <Contact />
                    </ScrollReveal>
                </main>

                {/* Footer */}
                <ScrollReveal animation="fade" delay={100} duration={600}>
                    <Footer />
                </ScrollReveal>
            </div>
        </ThemeProvider>
    );
};

export default Index;