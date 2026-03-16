import { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import experiencesData from "@/data/workExperience.json";

// ==============================
// Data — sorted newest → oldest
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
    const [activeId, setActiveId] = useState<string>("exxon");
    const [showMore, setShowMore] = useState(false);
    const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(["exxon"]));
    const [dotTop, setDotTop] = useState(0);

    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const timelineRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const updateActive = useCallback(() => {
        const viewportMid = window.innerHeight * 0.4;
        let closest = experiences[0].id;
        let closestDist = Infinity;

        for (const exp of experiences) {
            const el = cardRefs.current[exp.id];
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
            if (dist < closestDist) {
                closestDist = dist;
                closest = exp.id;
            }
        }
        setActiveId(closest);

        // Move floating dot to centre of active card
        const activeEl = cardRefs.current[closest];
        if (activeEl && sectionRef.current) {
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const cardRect = activeEl.getBoundingClientRect();
            setDotTop(cardRect.top - sectionRect.top + cardRect.height / 2);
        }

        // Fade-in cards entering viewport
        for (const exp of experiences) {
            const el = cardRefs.current[exp.id];
            if (!el) continue;
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                setVisibleIds((prev) => new Set([...prev, exp.id]));
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", updateActive, { passive: true });
        updateActive();
        return () => window.removeEventListener("scroll", updateActive);
    }, [updateActive, showMore]);

    const displayed = showMore ? experiences : [experiences[0]];

    return (
        <section id="experience" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Heading */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center md:text-left">
                        Work Experience
                    </h2>
                    <p className="text-muted-foreground text-center md:text-left">
                        Professional and internship experience across technology and industry roles
                    </p>
                </div>

                {/* Timeline */}
                <div ref={sectionRef} className="relative">
                    {/* Vertical line */}
                    <div
                        ref={timelineRef}
                        className="absolute left-[11px] md:left-[19px] top-3 bottom-3 w-px bg-border hidden sm:block"
                    />

                    {/* Floating animated dot */}
                    <div
                        className="absolute left-[4px] md:left-[12px] w-[15px] h-[15px] rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#3BA8FF] border-4 border-background shadow-lg ring-2 ring-[#7C4DFF]/30 transition-all duration-300 ease-out hidden sm:block z-10"
                        style={{ top: dotTop - 7.5 }}
                    />

                    <div className="space-y-6">
                        {displayed.map((exp) => {
                            const isActive = exp.id === activeId;
                            const isVisible = visibleIds.has(exp.id);

                            return (
                                <div
                                    key={exp.id}
                                    ref={(el) => { cardRefs.current[exp.id] = el; }}
                                    className={`relative pl-0 sm:pl-12 md:pl-14 transition-all duration-500
                                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                                >

                                    {/* Card — same design for every role */}
                                    <div className={`rounded-2xl overflow-hidden transition-all duration-300
                                        ${isActive
                                            ? "bg-white dark:bg-muted shadow-md ring-2 ring-primary/20"
                                            : "bg-white dark:bg-muted shadow-sm hover:shadow-md hover:ring-2 hover:ring-primary/10"
                                        }`}>

                                        {/* Active accent bar */}
                                        <div className={`h-1 w-full transition-all duration-300
                                            ${isActive ? "bg-gradient-to-r from-[#7C4DFF] to-[#3BA8FF]" : "bg-border"}`}
                                        />

                                        <div className="flex flex-col">
                                            {/* Header Section: Responsive Grid */}
                                            <div className="p-5 sm:p-6 lg:p-8 border-b border-border grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 items-start">
                                                
                                                {/* 1. Company Logo (Top on Mobile, Left on Desktop) */}
                                                <div className="flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-2xl border border-border flex items-center justify-center p-3 shadow-sm overflow-hidden mx-auto lg:mx-0">
                                                    {exp.logo ? (
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.company}
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                const el = e.target as HTMLImageElement;
                                                                el.style.display = "none";
                                                                el.parentElement!.innerHTML =
                                                                    `<span class="text-2xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#3BA8FF] bg-clip-text text-transparent">${exp.company.charAt(0)}</span>`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-2xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#3BA8FF] bg-clip-text text-transparent">
                                                            {exp.company.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Role & Company Details */}
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden">
                                                    <div className="flex-1 min-w-0 space-y-1.5 text-center lg:text-left">
                                                        {/* 2. Job Title */}
                                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1">
                                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{exp.role}</h3>
                                                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[#3BA8FF]/10 text-[#3BA8FF] px-2.5 py-1 rounded-full border border-[#3BA8FF]/20">
                                                                {exp.type}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* 3. Company Name */}
                                                        <p className="text-lg font-bold bg-gradient-to-r from-[#7C4DFF] to-[#3BA8FF] bg-clip-text text-transparent">{exp.company}</p>
                                                        
                                                        {/* 4. Team Name */}
                                                        {exp.team && (
                                                            <p className="text-sm font-medium text-muted-foreground">{exp.team}</p>
                                                        )}
                                                    </div>

                                                    {/* 5. Date & Location (Right-aligned on Desktop) */}
                                                    <div className="flex flex-col items-center lg:items-end gap-2 text-sm text-muted-foreground shrink-0 lg:text-right">
                                                        <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                                                            <Calendar className="w-3.5 h-3.5" />{exp.period}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                                                            <MapPin className="w-3.5 h-3.5" />{exp.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Body Section */}
                                            <div className="p-5 sm:p-6 lg:p-8 space-y-8 bg-black/5 dark:bg-white/[0.02]">
                                                {/* 6. Key Responsibilities */}
                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-4 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#3BA8FF]" />
                                                        Key Responsibilities
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {exp.responsibilities.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                <CheckCircle2 className="w-4 h-4 text-[#3BA8FF] mt-1 flex-shrink-0" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* 7. Technologies Used */}
                                                {exp.techUsed && exp.techUsed.length > 0 && (
                                                    <div>
                                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-4 flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                            Technologies Used
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.techUsed.map((tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-0.5"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View More / Less */}
                <div className="flex justify-center sm:pl-14">
                    <button
                        onClick={() => {
                            if (showMore) {
                                // Scroll back to top of experience section when showing less
                                const el = document.getElementById("experience");
                                if (el) {
                                    const offset = 90; // Header offset
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = el.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - offset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth"
                                    });
                                }
                            }
                            setShowMore((v) => !v);
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm"
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

export default WorkExperience;
