import React, { useState, useEffect, useRef } from "react";
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

interface UnifiedSkill extends Skill {
    categoryId: string;
    categoryLabel: string;
    themeRgb: string;
    themeTailwind: string;
}

// ==============================
// Icon Mapping & Colors
// ==============================

const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-4 h-4" />,
    Cloud: <Cloud className="w-4 h-4" />,
    Database: <Database className="w-4 h-4" />,
    BrainCircuit: <BrainCircuit className="w-4 h-4" />,
    Wrench: <Wrench className="w-4 h-4" />,
    ClipboardList: <ClipboardList className="w-4 h-4" />,
};

const categoryThemeMap: Record<string, { rgb: string, tailwind: string }> = {
    web: { rgb: "168, 85, 247", tailwind: "purple-500" },          // Purple/Indigo
    devops: { rgb: "6, 182, 212", tailwind: "cyan-500" },          // Blue/Cyan
    data: { rgb: "16, 185, 129", tailwind: "emerald-500" },        // Green
    ai: { rgb: "236, 72, 153", tailwind: "pink-500" },             // Pink/Magenta
    tools: { rgb: "249, 115, 22", tailwind: "orange-500" },        // Orange
    methodologies: { rgb: "161, 161, 170", tailwind: "zinc-400" }, // Gray
};

// ==============================
// Data Initialization
// ==============================

// Extract categories for tabs
const categories = skillsData.map(group => ({
    id: group.id,
    label: group.label,
    icon: iconMap[group.icon] || <Layout className="w-4 h-4" />
}));

// Create a single flattened array of all skills
const allSkills: UnifiedSkill[] = [];
skillsData.forEach((group) => {
    const theme = categoryThemeMap[group.id] || categoryThemeMap.methodologies;
    const skills = group.skills as Skill[];
    skills.forEach(skill => {
        allSkills.push({
            ...skill,
            categoryId: group.id,
            categoryLabel: group.label,
            themeRgb: theme.rgb,
            themeTailwind: theme.tailwind
        });
    });
});

// Proficiency display mapping
const levelLabels: Record<string, string> = {
    core: "Core",
    experienced: "Proficient",
    familiar: "Familiar"
};

// ==============================
// Constants
// ==============================

const BASE_SCROLL_SPEED = 0.5; // pixels per frame
const DRAG_MOMENTUM_MULTIPLIER = 0.8;
const MAX_VELOCITY = 15;

// ==============================
// Unified Marquee Track
// ==============================

const UnifiedMarqueeTrack: React.FC<{
    skills: UnifiedSkill[];
    onCategoryChange: (categoryId: string) => void;
    forceScrollToCategory?: string | null;
    clearForceScroll?: () => void;
}> = ({ skills, onCategoryChange, forceScrollToCategory, clearForceScroll }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const rafRef = useRef<number>(0);
    const velocityRef = useRef(-BASE_SCROLL_SPEED); // default left
    
    // Drag state
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragOffsetStart = useRef(0);
    const recentDx = useRef<number[]>([]);
    const lastInteractionTime = useRef(performance.now());
    
    // Geometry
    const singleSetWidth = useRef(0);
    const activeCategoryIdRef = useRef<string | null>(null);

    // Duplicate skills for seamless wrapping (4x ensures we always have enough offscreen content)
    const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

    // Measure single set width once mounted
    useEffect(() => {
        if (!trackRef.current) return;
        const children = trackRef.current.children;
        const count = skills.length;
        let w = 0;
        for (let i = 0; i < count && i < children.length; i++) {
            const child = children[i] as HTMLElement;
            w += child.offsetWidth + 24; // 24 = gap-6 in tailwind
        }
        singleSetWidth.current = w;
    }, [skills]);

    // Force scroll to specific category
    useEffect(() => {
        if (forceScrollToCategory && trackRef.current && singleSetWidth.current > 0) {
            // Find the first item matching this category inside the *first* data set
            const children = Array.from(trackRef.current.children);
            const targetChild = children.find(child => child.getAttribute("data-category") === forceScrollToCategory);
            
            if (targetChild) {
                // Calculate position to center this item
                const rect = targetChild.getBoundingClientRect();
                const trackRect = trackRef.current.parentElement!.getBoundingClientRect();
                const centerOffset = trackRect.width / 2 - rect.width / 2;
                
                // We want to set offsetRef such that this item is at centerOffset relative to the track's viewport
                // The item's current relative position in the track is `child.offsetLeft`
                const targetOffset = -((targetChild as HTMLElement).offsetLeft) + centerOffset;
                
                offsetRef.current = targetOffset;
                
                // Let the momentum settle to default left scroll, but smoothly
                velocityRef.current = -BASE_SCROLL_SPEED;
            }
            if (clearForceScroll) clearForceScroll();
        }
    }, [forceScrollToCategory, clearForceScroll]);

    // RAF loop — Center detection & continuous motion
    useEffect(() => {
        const animate = (time: number) => {
            const dt = time - lastInteractionTime.current;
            lastInteractionTime.current = time;

            // Apply inertia decay if we are moving too fast (after drag)
            if (!isDragging.current) {
                if (velocityRef.current > BASE_SCROLL_SPEED) {
                    velocityRef.current = Math.max(BASE_SCROLL_SPEED, velocityRef.current * 0.95);
                } else if (velocityRef.current < -BASE_SCROLL_SPEED) {
                    velocityRef.current = Math.min(-BASE_SCROLL_SPEED, velocityRef.current * 0.95);
                }
                
                // Add velocity to offset
                // Normalize by 16.66ms (approx 60fps) to keep speed consistent across refresh rates
                offsetRef.current += velocityRef.current * (Math.min(dt, 32) / 16.66);
            }

            // Wrap around seamlessly
            if (singleSetWidth.current > 0) {
                if (offsetRef.current <= -singleSetWidth.current) {
                    offsetRef.current += singleSetWidth.current;
                } else if (offsetRef.current > 0) {
                    offsetRef.current -= singleSetWidth.current;
                }
            }

            if (trackRef.current) {
                // Determine viewport center for math
                const parentRect = trackRef.current.parentElement!.getBoundingClientRect();
                const centerX = parentRect.left + parentRect.width / 2;
                
                // Apply translate
                trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

                // Center Detection Logic (avoiding getBoundingClientRect scaling issues)
                let closestChild: HTMLElement | null = null;
                let minDistance = Infinity;

                const children = trackRef.current.children;
                // We only need to check a subset, but 100 simple math operations is very cheap
                for (let i = 0; i < children.length; i++) {
                    const child = children[i] as HTMLElement;
                    
                    // child.offsetLeft is relative to the track container.
                    // The track container is shifted by offsetRef.current relative to parent Rect
                    // So child's absolute X center = parentRect.left + offsetRef.current + child.offsetLeft + child.offsetWidth / 2
                    const childCenterAbsolute = parentRect.left + offsetRef.current + child.offsetLeft + child.offsetWidth / 2;
                    const distance = Math.abs(childCenterAbsolute - centerX);

                    // Focus Effect Maths
                    // Center card: scale 1.08, opacity 1
                    // Non-centered: scale 0.95, opacity 0.5, blur 1px
                    const maxDist = 250; 
                    const ratio = Math.max(0, 1 - distance / maxDist); // 1 = perfectly centered, 0 = far away
                    const smoothRatio = ratio * ratio * (3 - 2 * ratio); // smoothstep
                    
                    const scale = 0.92 + (0.16 * smoothRatio); // 0.92 up to 1.08
                    const opacity = 0.4 + (0.6 * smoothRatio); // 0.4 up to 1.0
                    const blur = 1.5 - (1.5 * smoothRatio); // 1.5px blur down to 0px
                    
                    // Apply styles directly to bypass React render cycle for 60fps
                    child.style.transform = `scale(${scale})`;
                    child.style.opacity = `${opacity}`;
                    child.style.filter = `blur(${blur}px)`;
                    
                    // Dynamic glow based on center proximity
                    const rgb = child.getAttribute("data-rgb");
                    if (rgb) {
                        const glowIntensity = 0.5 * smoothRatio; // 0 to 0.5
                        
                        // Clear any ghost styles from previous HMR on the square wrapper
                        child.style.boxShadow = "none";
                        child.style.borderColor = "transparent";

                        // Apply glow and border to the inner rounded card element, NOT the outer square wrapper
                        const innerCard = child.firstElementChild as HTMLElement | null;
                        if (innerCard) {
                            innerCard.style.boxShadow = `0 0 ${20 + 30 * smoothRatio}px -5px rgba(${rgb}, ${glowIntensity})`;
                            innerCard.style.borderColor = `rgba(${rgb}, ${0.1 + 0.4 * smoothRatio})`;
                        }
                    }

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestChild = child;
                    }
                }

                // Update Active Category Tab
                if (closestChild) {
                    const categoryId = closestChild.getAttribute("data-category");
                    if (categoryId && categoryId !== activeCategoryIdRef.current) {
                        activeCategoryIdRef.current = categoryId;
                        onCategoryChange(categoryId);
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [onCategoryChange]);

    // Pointer Handlers for Drag
    const handlePointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragOffsetStart.current = offsetRef.current;
        recentDx.current = [];
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        offsetRef.current = dragOffsetStart.current + dx;
        
        // Track recent momentums
        recentDx.current.push(e.movementX);
        if (recentDx.current.length > 5) recentDx.current.shift();
    };

    const handlePointerUp = () => {
        isDragging.current = false;
        
        // Calculate release velocity based on recent frames
        const sumDx = recentDx.current.reduce((a, b) => a + b, 0);
        const avgDx = recentDx.current.length ? sumDx / recentDx.current.length : 0;
        
        let newVelocity = avgDx * DRAG_MOMENTUM_MULTIPLIER;
        
        // Clamp velocity
        newVelocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, newVelocity));
        
        // If they released with almost no momentum, resume default direction based on recent drag
        if (Math.abs(newVelocity) < BASE_SCROLL_SPEED) {
            velocityRef.current = newVelocity >= 0 ? BASE_SCROLL_SPEED : -BASE_SCROLL_SPEED;
        } else {
            velocityRef.current = newVelocity;
        }
    };

    return (
        <div 
            className="w-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: "pan-y" }}
        >
            {/* Edge Fades / Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0a0a1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10 pointer-events-none" />

            <div 
                ref={trackRef}
                className="flex gap-6 py-12 px-[50vw] will-change-transform" /* Large horizontal padding to allow centering first/last items before wrapping offset kicks in */
            >
                {duplicatedSkills.map((skill, index) => {
                    const levelLabel = levelLabels[skill.level ?? "familiar"];
                    
                    return (
                        <div
                            key={`${skill.name}-${index}`}
                            className="flex-shrink-0 w-[160px] md:w-[200px]"
                            data-category={skill.categoryId}
                            data-rgb={skill.themeRgb}
                        >
                            <div className="h-full p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md transition-colors duration-200 text-center flex flex-col items-center justify-center space-y-4" style={{ borderWidth: '1px' }}>
                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src={skill.image}
                                        alt={skill.name}
                                        className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300 pointer-events-none select-none"
                                        draggable={false}
                                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                                    />
                                </div>
                                {/* Name */}
                                <p className="text-base font-semibold text-white/90 leading-tight w-full">
                                    {skill.name}
                                </p>
                                {/* Badge */}
                                <span 
                                    className="text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border"
                                    style={{
                                        color: `rgba(${skill.themeRgb}, 0.9)`,
                                        backgroundColor: `rgba(${skill.themeRgb}, 0.1)`,
                                        borderColor: `rgba(${skill.themeRgb}, 0.2)`
                                    }}
                                >
                                    {levelLabel}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ==============================
// Skills & Expertise Container
// ==============================

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
    const [forceScrollCategory, setForceScrollCategory] = useState<string | null>(null);

    return (
        <section
            id="skills"
            className="relative py-20 px-4 md:px-12 lg:px-20 overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0a0a1a 0%, #160a2c 50%, #0a0a1a 100%)",
            }}
        >
            <div className="max-w-[90rem] mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white text-center">
                        Skills & Expertise
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-center">
                        A continuous spectrum of technologies and tools across my domains
                    </p>
                </div>

                {/* Main Unified Container */}
                <div className="mx-auto rounded-[32px] bg-[#0f0a1c]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative">
                    
                    {/* Inner top glow */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    <div className="pt-10 pb-4">
                        {/* Category Navigation Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-6 md:px-12 mb-2">
                            {categories.map((cat) => {
                                const isActive = cat.id === activeCategory;
                                const theme = categoryThemeMap[cat.id];
                                
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveCategory(cat.id);
                                            setForceScrollCategory(cat.id);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition-all duration-300 relative border-b-2
                                            ${isActive
                                                ? "text-white scale-105"
                                                : "text-zinc-500 border-transparent hover:text-zinc-300"
                                            }`}
                                        style={{
                                            borderBottomColor: isActive ? `rgba(${theme.rgb}, 0.8)` : 'transparent',
                                            textShadow: isActive ? `0 0 12px rgba(${theme.rgb}, 0.6)` : 'none'
                                        }}
                                    >
                                        <div style={{ color: isActive ? `rgb(${theme.rgb})` : 'inherit' }} className="transition-colors duration-300">
                                            {cat.icon}
                                        </div>
                                        <span className="hidden sm:inline">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Unified Carousel */}
                        <UnifiedMarqueeTrack 
                            skills={allSkills} 
                            onCategoryChange={setActiveCategory} 
                            forceScrollToCategory={forceScrollCategory}
                            clearForceScroll={() => setForceScrollCategory(null)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;