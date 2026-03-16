import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

// ==============================
// Data
// ==============================

import caseStudiesData from "@/data/enterpriseProjects.json";

interface CaseStudy {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    accent: string;          // gradient class
    accentText: string;      // text colour class for active elements
    description: string;
    problem: string;
    solution: string;
    tools: string[];
    impact: string[];
    architecture: { label: string; items: string[] }[];
}

const caseStudies: CaseStudy[] = caseStudiesData;

// ==============================
// Component
// ==============================

const EnterpriseProjects = () => {
    const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Scroll-based fade-in
    useEffect(() => {
        const check = () => {
            for (const cs of caseStudies) {
                const el = cardRefs.current[cs.id];
                if (el && el.getBoundingClientRect().top < window.innerHeight - 60) {
                    setVisibleIds((prev) => new Set([...prev, cs.id]));
                }
            }
        };
        window.addEventListener("scroll", check, { passive: true });
        check();
        return () => window.removeEventListener("scroll", check);
    }, []);

    return (
        <div className="space-y-8 md:space-y-10">

            {/* Sub-Header */}
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-center md:text-left">
                    Enterprise Projects
                </h3>
                <p className="text-muted-foreground text-center md:text-left mt-3 md:mt-4">
                    Professional case studies from my internship at ExxonMobil
                </p>
            </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                    {caseStudies.map((cs) => {
                        const isVisible = visibleIds.has(cs.id);

                        return (
                            <div
                                key={cs.id}
                                ref={(el) => { cardRefs.current[cs.id] = el; }}
                                className={`flex flex-col bg-white dark:bg-muted rounded-2xl shadow-sm overflow-hidden
                                    transition-all duration-500 hover:shadow-lg hover:-translate-y-1
                                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            >
                                {/* Gradient accent bar */}
                                <div className={`h-1.5 w-full bg-gradient-to-r ${cs.accent}`} />

                                {/* Card header */}
                                <div className="p-8 flex-1 flex flex-col">
                                    {/* Icon + title */}
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl leading-none select-none transition-transform duration-300 group-hover:scale-110">
                                            {cs.icon}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold leading-snug">{cs.title}</h3>
                                            <p className={`text-sm font-medium mt-0.5 ${cs.accentText}`}>{cs.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                        {cs.description}
                                    </p>

                                    {/* Impact bullets */}
                                    <div className="mt-5">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Key Impact
                                        </p>
                                        <ul className="space-y-2.5">
                                            {cs.impact.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech tags */}
                                    <div className="mt-5 flex flex-wrap gap-2.5">
                                        {cs.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="text-xs font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
        </div>
    );
};

export default EnterpriseProjects;
