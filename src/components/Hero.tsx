import { Button } from "@/components/ui/button";
import { FileDown, ArrowDown } from "lucide-react";
import ifwadImg from "@/assets/ifwad.jpeg";

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background pt-10 pb-1"
        >
            <div className="max-w-7xl w-full grid md:grid-cols-2 items-center gap-12">
                {/* Text Content */}
                <div className="space-y-6 order-2 md:order-1">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        Hi, I'm <span className="text-primary">Muhammad Ifwad Bin Ismail</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-foreground">
                        <span>Software Engineering Student</span>
                        <span className="block">Full Stack Developer & UI/UX Enthusiast</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-lg">
                        I build clean, responsive interfaces and seamless user journeys. With a passion for detail and a focus on user needs, I turn ideas into polished digital products.
                    </p>

                    {/* Buttons */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <Button asChild>
                                <a href="#contact">Get in Touch</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="#projects">View Projects</a>
                            </Button>
                            <Button variant="ghost" asChild>
                                <a
                                    href="/resume-ifwad.pdf"
                                    download
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
                                >
                                    <FileDown className="h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </div>

                        {/* Mobile Scroll Arrow */}
                        <div className="flex justify-center md:hidden pt-2">
                            <a href="#about" aria-label="Scroll down" className="animate-bounce text-muted-foreground">
                                <ArrowDown className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Image / Avatar */}
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

            {/* Desktop Scroll Arrow */}
            <a
                href="#about"
                className="hidden md:flex absolute bottom-30 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground"
                aria-label="Scroll down"
            >
                <ArrowDown className="w-6 h-6" />
            </a>
        </section>
    );
};

export default Hero;