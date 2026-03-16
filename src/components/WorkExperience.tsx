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
                        className="absolute left-[4px] md:left-[12px] w-[15px] h-[15px] rounded-full bg-primary border-4 border-background shadow-lg ring-2 ring-primary/30 transition-all duration-300 ease-out hidden sm:block z-10"
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
                                    className={`relative sm:pl-12 md:pl-14 transition-all duration-500
                                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                                >
                                    {/* Mobile static dot */}
                                    <div className={`absolute left-0 top-6 w-[15px] h-[15px] rounded-full border-4 border-background shadow transition-colors duration-300 sm:hidden
                                        ${isActive ? "bg-primary ring-2 ring-primary/30" : "bg-border"}`}
                                    />

                                    {/* Card — same design for every role */}
                                    <div className={`rounded-2xl overflow-hidden transition-all duration-300
                                        ${isActive
                                            ? "bg-white dark:bg-muted shadow-md ring-2 ring-primary/20"
                                            : "bg-white dark:bg-muted shadow-sm hover:shadow-md hover:ring-2 hover:ring-primary/10"
                                        }`}>

                                        {/* Active accent bar */}
                                        <div className={`h-1 w-full transition-all duration-300
                                            ${isActive ? "bg-primary" : "bg-border"}`}
                                        />

                                        {/* Header */}
                                        <div className="p-8 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4">

                                            {/* Logo placeholder — shown for all; falls back gracefully */}
                                            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl border border-border flex items-center justify-center p-2 shadow-sm overflow-hidden">
                                                {exp.logo ? (
                                                    <img
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            const el = e.target as HTMLImageElement;
                                                            el.style.display = "none";
                                                            el.parentElement!.innerHTML =
                                                                `<span class="text-xl font-bold text-primary">${exp.company.charAt(0)}</span>`;
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-xl font-bold text-primary">
                                                        {exp.company.charAt(0)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Role info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold">{exp.role}</h3>
                                                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        {exp.type}
                                                    </span>
                                                </div>
                                                <p className="text-base font-semibold text-primary">{exp.company}</p>
                                                {exp.team && (
                                                    <p className="text-sm text-muted-foreground">{exp.team}</p>
                                                )}
                                            </div>

                                            {/* Date & location */}
                                            <div className="flex flex-col gap-1 text-sm text-muted-foreground shrink-0">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />{exp.period}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />{exp.location}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-8 space-y-6">
                                            <div>
                                                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                                                    Key Responsibilities
                                                </h4>
                                                <ul className="space-y-2.5">
                                                    {exp.responsibilities.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Tech tags — only if provided */}
                                            {exp.techUsed && exp.techUsed.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                                        Technologies Used
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {exp.techUsed.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
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
                            );
                        })}
                    </div>
                </div>

                {/* View More / Less */}
                <div className="flex justify-center sm:pl-14">
                    <button
                        onClick={() => setShowMore((v) => !v)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
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
