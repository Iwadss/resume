import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, ExternalLink, CalendarCheck, Hash, Award } from "lucide-react";
import certificationsData from "@/data/certifications.json";

// ==============================
// Types
// ==============================

interface Certification {
    name: string;
    issuer: string;
    issuedTo: string;
    examCode: string;
    credentialId: string;
    verificationCode: string;
    date: string;
    expiry: string;
    status: string;
    logo: string;
    description: string;
    skills: string[];
    verifyUrl: string;
    credlyUrl: string;
    color: string;
}

const certifications: Certification[] = certificationsData;

// Map Tailwind gradient class → RGB for neon glow
const glowColorMap: Record<string, string> = {
    "from-sky-500 to-blue-600": "56, 189, 248",
    "from-orange-500 to-amber-600": "249, 115, 22",
    "from-green-500 to-emerald-600": "34, 197, 94",
    "from-purple-500 to-violet-600": "168, 85, 247",
    "from-red-500 to-rose-600": "239, 68, 68",
};

function getGlowRGB(color: string): string {
    return glowColorMap[color] || "56, 189, 248";
}

// ==============================
// Component
// ==============================

const Certifications = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Stronger parallax: move track as user scrolls past
    const parallaxRaw = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const parallaxX = useSpring(parallaxRaw, { stiffness: 100, damping: 30 });

    // Update drag constraints and track active dot
    useEffect(() => {
        const updateConstraints = () => {
            if (carouselRef.current && containerRef.current) {
                const trackWidth = carouselRef.current.scrollWidth;
                const containerWidth = containerRef.current.offsetWidth;
                setDragConstraints({
                    left: -(trackWidth - containerWidth + 40),
                    right: 40
                });
            }
        };

        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [certifications.length]);

    const onDragEnd = () => {
        // No index tracking needed as dots are removed
    };

    return (
        <section 
            id="certifications" 
            ref={containerRef}
            className="py-24 px-4 md:px-8 overflow-hidden bg-secondary/30"
        >
            <div className="max-w-7xl mx-auto mb-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Certifications
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Technical credentials and technical expertise.
                    </p>
                </motion.div>
            </div>

            {/* Draggable & Parallax Track */}
            <div className="relative group cursor-grab active:cursor-grabbing">
                <motion.div 
                    ref={carouselRef}
                    drag="x"
                    dragConstraints={dragConstraints}
                    dragElastic={0.1}
                    onDragEnd={onDragEnd}
                    style={{ x: parallaxX }}
                    whileDrag={{ cursor: "grabbing" }}
                    className="flex gap-6 md:gap-8 px-4 md:px-20 lg:px-[10%] py-4"
                >
                    {certifications.map((cert, index) => {
                        const glowRGB = getGlowRGB(cert.color);

                        return (
                            <div
                                key={index}
                                className="cert-card-container h-[420px] md:h-[450px] w-[300px] md:w-[380px] shrink-0"
                                style={{ borderRadius: "1.5rem" }}
                            >
                                <div className="cert-card-inner">
                                    {/* ═══════ FRONT FACE ═══════ */}
                                    <div 
                                        className="cert-card-front h-full flex flex-col p-8 rounded-3xl border border-white/10 bg-muted/40 backdrop-blur-xl transition-all duration-300 group-hover:bg-muted/60 relative overflow-hidden"
                                        style={{ boxShadow: `0 0 20px -10px rgba(${glowRGB}, 0.2)` }}
                                    >
                                        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                                        
                                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-sm">
                                                <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground line-clamp-2">{cert.name}</h3>
                                                <p className="text-xs md:text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-1.5">
                                                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                                                    <span className="text-[10px] md:text-xs font-semibold text-green-600 dark:text-green-400">{cert.status}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                                                    <CalendarCheck className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                                    <span>Issued {cert.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ═══════ BACK FACE ═══════ */}
                                    <div 
                                        className="cert-card-back h-full flex flex-col p-6 rounded-3xl border border-white/10 bg-muted/40 backdrop-blur-xl relative overflow-hidden"
                                        style={{ boxShadow: `0 0 20px -10px rgba(${glowRGB}, 0.2)` }}
                                    >
                                        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                                        
                                        <div className="flex-1 flex flex-col justify-between space-y-3 md:space-y-4 text-left">
                                            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{cert.description}</p>
                                            <div className="space-y-1.5 md:space-y-2">
                                                <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">Key Skills</h4>
                                                <div className="flex flex-wrap gap-1 md:gap-1.5">
                                                    {cert.skills.slice(0, 6).map((skill) => (
                                                        <span key={skill} className="text-[9px] md:text-[10px] font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border" style={{ background: `rgba(${glowRGB}, 0.05)`, borderColor: `rgba(${glowRGB}, 0.2)`, color: `rgba(${glowRGB}, 0.9)` }}>{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-1 md:space-y-1.5">
                                                <div className="flex items-center gap-2 text-[10px] md:text-xs">
                                                    <Hash className="w-3 md:w-3.5 h-3 md:h-3.5 text-muted-foreground" />
                                                    <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground"><span className="font-semibold text-foreground">ID:</span> {cert.credentialId}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] md:text-xs">
                                                    <CalendarCheck className="w-3 md:w-3.5 h-3 md:h-3.5 text-muted-foreground" />
                                                    <span className="text-muted-foreground"><span className="font-semibold text-foreground">Expires:</span> {cert.expiry}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 md:space-y-2 pt-2 md:pt-3 border-t border-border dark:border-white/5">
                                                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="cert-ghost-btn justify-center text-[10px] md:text-xs py-1.5" style={{ borderColor: `rgba(${glowRGB}, 0.3)`, color: `rgba(${glowRGB}, 0.9)` }}>
                                                    <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5 mr-1.5" /> Verify <ExternalLink className="w-2.5 md:w-3 h-2.5 md:h-3 ml-1.5" />
                                                </a>
                                                <a href={cert.credlyUrl} target="_blank" rel="noopener noreferrer" className="cert-ghost-btn justify-center text-[10px] md:text-xs py-1.5" style={{ borderColor: `rgba(${glowRGB}, 0.3)`, color: `rgba(${glowRGB}, 0.9)` }}>
                                                    <Award className="w-3 md:w-3.5 h-3 md:h-3.5 mr-1.5" /> Credly <ExternalLink className="w-2.5 md:w-3 h-2.5 md:h-3 ml-1.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;


