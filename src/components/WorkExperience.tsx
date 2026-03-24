import { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import experiencesData from "@/data/workExperience.json";

// ==============================
// Types
// ==============================

interface Experience {
    id: string;
    company: string;
    role: string;
    team?: string;
    location: string;
    period: string;
    type: string;
    logo?: string;
    responsibilities: string[];
    techUsed?: string[];
}

const experiences: Experience[] = experiencesData;

// ==============================
// Component
// ==============================

const WorkExperience = () => {
    const [showMore, setShowMore] = useState(false);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [lineProgress, setLineProgress] = useState(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Scroll-driven timeline draw + card reveal via IntersectionObserver
    const handleScroll = useCallback(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate how far through the section we've scrolled (0 → 1)
        const scrolled = Math.min(
            Math.max((viewportHeight - sectionTop) / (sectionHeight + viewportHeight * 0.5), 0),
            1
        );
        setLineProgress(scrolled);
    }, []);

    // IntersectionObserver for card reveals
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-exp-id");
                        if (id) {
                            setRevealedIds((prev) => new Set([...prev, id]));
                        }
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        // Observe current cards
        Object.values(cardRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [showMore]); // re-observe when cards expand

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const displayed = showMore ? experiences : [experiences[0]];

    return (
        <section id="experience" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Section Heading */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Work Experience
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Professional and internship experience across technology and industry roles
                    </p>
                </div>

                {/* Timeline Container */}
                <div ref={sectionRef} className="relative">

                    {/* ── Central timeline line (desktop) / Left line (mobile) ── */}
                    <div
                        className="timeline-line absolute w-[2px] top-0 bottom-0
                                   left-[20px] md:left-[24px] lg:left-1/2 lg:-translate-x-1/2
                                   hidden sm:block"
                        style={{ transform: `scaleY(${lineProgress})` }}
                    />

                    {/* ── Cards ── */}
                    <div className="space-y-10 lg:space-y-16">
                        {displayed.map((exp, index) => {
                            const isRevealed = revealedIds.has(exp.id);
                            const isLeft = index % 2 === 0; // alternates on desktop

                            return (
                                <div
                                    key={exp.id}
                                    data-exp-id={exp.id}
                                    ref={(el) => { cardRefs.current[exp.id] = el; }}
                                    className={`relative ${isRevealed ? "card-revealed" : "card-hidden"}`}
                                >
                                    {/* ── Desktop alternating grid ── */}
                                    <div className="hidden lg:grid grid-cols-[1fr_48px_1fr] gap-6 items-start">
                                        {/* Left column */}
                                        <div className="min-w-0">
                                            {isLeft && <TimelineCard exp={exp} />}
                                        </div>

                                        {/* Center node */}
                                        <div className="flex justify-center">
                                            <TimelineNode exp={exp} isRevealed={isRevealed} />
                                        </div>

                                        {/* Right column */}
                                        <div className="min-w-0">
                                            {!isLeft && <TimelineCard exp={exp} />}
                                        </div>
                                    </div>

                                    {/* ── Mobile / Tablet: left-aligned timeline ── */}
                                    <div className="lg:hidden flex gap-4 sm:gap-6">
                                        {/* Mobile node */}
                                        <div className="flex-shrink-0 relative z-10">
                                            <TimelineNode exp={exp} isRevealed={isRevealed} />
                                        </div>
                                        {/* Mobile card */}
                                        <div className="flex-1 min-w-0">
                                            <TimelineCard exp={exp} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View More / Less */}
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (showMore) {
                                const el = document.getElementById("experience");
                                if (el) {
                                    const offset = 90;
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = el.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - offset;
                                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                }
                            }
                            setShowMore((v) => !v);
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl
                                   border border-white/10 text-sm font-semibold
                                   text-muted-foreground hover:text-white
                                   hover:border-blue-500/40 hover:bg-blue-500/5
                                   transition-all duration-300 shadow-sm min-h-[44px]"
                    >
                        {showMore ? (
                            <><ChevronUp className="w-4 h-4" />Show Less</>
                        ) : (
                            <><ChevronDown className="w-4 h-4" />View More Experience ({experiences.length - 1} more roles)</>
                        )}
                    </button>
                </div>

            </div>
        </section>
    );
};

// ==============================
// Sub-components
// ==============================

/** Timeline node — the logo circle sitting on the vertical axis */
const TimelineNode = ({ exp, isRevealed }: { exp: Experience; isRevealed: boolean }) => (
    <div className={`timeline-node ${isRevealed ? "active" : ""}`}>
        {exp.logo ? (
            <img
                src={exp.logo}
                alt={exp.company}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.innerHTML =
                        `<span class="text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">${exp.company.charAt(0)}</span>`;
                }}
            />
        ) : (
            <span className="text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {exp.company.charAt(0)}
            </span>
        )}
    </div>
);

/** The glassmorphism experience card */
const TimelineCard = ({ exp }: { exp: Experience }) => (
    <div className="glass-card overflow-hidden group">

        {/* Gradient accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Header */}
        <div className="p-5 sm:p-6 space-y-3">
            {/* Title + Type badge */}
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight">
                        {exp.role}
                    </h3>
                    <p className="text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {exp.company}
                    </p>
                    {exp.team && (
                        <p className="text-sm text-muted-foreground">{exp.team}</p>
                    )}
                </div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider
                                 bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full
                                 border border-blue-500/20 flex-shrink-0">
                    {exp.type}
                </span>
            </div>

            {/* Date + Location pills */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full min-h-[32px]">
                    <Calendar className="w-3 h-3 text-blue-400" />{exp.period}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full min-h-[32px]">
                    <MapPin className="w-3 h-3 text-purple-400" />{exp.location}
                </span>
            </div>
        </div>

        {/* Responsibilities */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                Key Achievements
            </h4>
            <ul className="space-y-2.5">
                {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            {/* Technologies */}
            {exp.techUsed && exp.techUsed.length > 0 && (
                <div className="pt-3 border-t border-white/5">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {exp.techUsed.map((tech) => (
                            <span
                                key={tech}
                                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg
                                           bg-white/5 text-zinc-300 border border-white/8
                                           transition-transform hover:-translate-y-0.5"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default WorkExperience;
