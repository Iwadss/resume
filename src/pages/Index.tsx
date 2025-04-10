// File: pages/Index.tsx
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="relative">
                <Header />

                <main className="pt-16 scroll-smooth md:scroll-auto">
                    {/* Sections */}
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Index;