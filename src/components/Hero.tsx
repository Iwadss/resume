import { HEADLINE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowDown } from "lucide-react";
import ifwadImg from "@/assets/ifwad.jpeg";
// @ts-expect-error: ShinyText is missing types
import ShinyText from "./ShinyText";


const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background overflow-hidden"
        >

            <div className="max-w-7xl w-full grid md:grid-cols-2 items-center gap-12 relative z-10">
                {/* ================================
                    Left Column: Hero Text Content
                ================================== */}
                <div className="order-2 md:order-1 flex flex-col justify-center">
                    {/* Heading & Subheading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        <div className="flex flex-wrap items-center">
                            Hi, I'm&nbsp;
                            <ShinyText 
                                text="Muhammad"
                                speed={3}
                                className="font-bold whitespace-nowrap"
                                color="#7C4DFF"
                                shineColor="#3BA8FF"
                            />
                        </div>
                        <div className="block mt-1">
                            <ShinyText 
                                text="Ifwad bin Ismail"
                                speed={3}
                                className="font-bold whitespace-nowrap"
                                color="#7C4DFF"
                                shineColor="#3BA8FF"
                            />
                        </div>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-foreground mt-4">
                        <span>Software Engineering</span>
                        <span className="block">{HEADLINE}</span>
                    </h2>

                    {/* Intro Paragraph */}
                    <p className="text-base text-muted-foreground max-w-lg mt-5">
                        I build scalable software solutions, modern web applications, and automation tools that improve developer workflows and user experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 space-y-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <Button asChild>
                                <a
                                    href="/Muhammad_Ifwad_CV_2026.pdf"
                                    download
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
                                >
                                    <FileDown className="h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </div>

                        {/* Mobile: Scroll Down Arrow */}
                        <div className="flex justify-center md:hidden pt-2">
                            <a
                                href="#about"
                                aria-label="Scroll down"
                                className="animate-bounce text-muted-foreground"
                            >
                                <ArrowDown className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ================================
                    Right Column: Hero Image
                ================================== */}
                <div className="order-1 md:order-2 flex justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg transition-all">
                        <img
                            src={ifwadImg}
                            alt="Professional headshot"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Desktop: Scroll Down Arrow */}
            <a
                href="#about"
                className="hidden md:flex absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground"
                aria-label="Scroll down"
            >
                <ArrowDown className="w-6 h-6" />
            </a>
        </section>
    );
};

export default Hero;