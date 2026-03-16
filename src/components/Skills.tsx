import React, { useState } from "react";
import { Layout, Cloud, Database, Wrench, BrainCircuit, ClipboardList } from "lucide-react";
import skillsData from "@/data/skills.json";

// ==============================
// Types
// ==============================

interface Skill {
    name: string;
    image: string;
    level?: "core" | "experienced" | "familiar";
}

interface SkillGroup {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;         // tab accent / badge colour
    bgActive: string;      // active tab bg
    skills: Skill[];
}

// ==============================
// Icon Mapping
// ==============================

const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-4 h-4" />,
    Cloud: <Cloud className="w-4 h-4" />,
    Database: <Database className="w-4 h-4" />,
    BrainCircuit: <BrainCircuit className="w-4 h-4" />,
    Wrench: <Wrench className="w-4 h-4" />,
    ClipboardList: <ClipboardList className="w-4 h-4" />,
};

// ==============================
// Data Initialization
// ==============================

const groups: SkillGroup[] = skillsData.map((group) => ({
    ...group,
    icon: iconMap[group.icon] || <Layout className="w-4 h-4" />,
    skills: group.skills as Skill[],
}));

// ==============================
// Level badge config
// ==============================

const levelConfig: Record<string, { label: string; className: string }> = {
    core: { label: "Core", className: "bg-primary/10 text-primary" },
    experienced: { label: "Proficient", className: "bg-secondary text-muted-foreground" },
    familiar: { label: "Familiar", className: "bg-muted text-muted-foreground" },
};

// ==============================
// Skills Component
// ==============================

const Skills = () => {
    const [activeId, setActiveId] = useState<string>(groups[0].id);

    const active = groups.find((g) => g.id === activeId)!;

    return (
        <section id="skills" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto">

                {/* Section Heading */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center md:text-left">
                        Skills & Expertise
                    </h2>
                    <p className="text-muted-foreground text-center md:text-left">
                        Technologies and tools I work with across different domains
                    </p>
                </div>

                {/* Tab Bar */}
                <div className="mt-5 flex flex-wrap gap-3">
                    {groups.map((group) => {
                        const isActive = group.id === activeId;
                        return (
                            <button
                                key={group.id}
                                onClick={() => setActiveId(group.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                                    ${isActive
                                        ? `${group.bgActive} ${group.color} shadow-sm`
                                        : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {group.icon}
                                {group.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold
                                    ${isActive ? "bg-white/60 dark:bg-black/20" : "bg-secondary"}`}>
                                    {group.skills.length}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Skills Panel */}
                <div className={`mt-6 rounded-2xl border ${active.bgActive} p-6 md:p-8 transition-all duration-200`}>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-border/60">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Proficiency</span>
                        {Object.entries(levelConfig).map(([key, val]) => (
                            <span key={key} className={`text-xs px-2 py-0.5 rounded-full font-medium ${val.className}`}>
                                {val.label}
                            </span>
                        ))}
                    </div>

                    {/* Skill Chips Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[...active.skills]
                            .sort((a, b) => {
                                const weights: Record<string, number> = { core: 1, experienced: 2, familiar: 3 };
                                const aWeight = weights[a.level ?? "familiar"] ?? 4;
                                const bWeight = weights[b.level ?? "familiar"] ?? 4;
                                return aWeight - bWeight;
                            })
                            .map((skill) => {
                            const lvl = levelConfig[skill.level ?? "familiar"];
                            return (
                                <div
                                    key={skill.name}
                                    className="flex items-center gap-2 bg-white dark:bg-muted rounded-xl p-4 shadow-sm border border-border hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
                                >
                                    <img
                                        src={skill.image}
                                        alt={skill.name}
                                        className="w-7 h-7 flex-shrink-0 object-contain"
                                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium leading-tight truncate">{skill.name}</p>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block ${lvl.className}`}>
                                            {lvl.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;