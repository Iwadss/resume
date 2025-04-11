import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import images statically for proper handling in production
import secretMinePreview from "@/assets/projects/secret-mine-preview.png";
import noImageAvailable from "@/assets/projects/No_image_available.png";

// ==============================
// Project Interface
// ==============================

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;     // Can be a GitHub URL or "private"
    liveLink?: string;   // Optional live site URL
}

// ==============================
// Projects Section Component
// ==============================

const Projects = () => {
    const [showAll, setShowAll] = useState(false); // Toggles visibility of all projects

    // Project list
    const projects: Project[] = [
        {
            title: "Secret.Mine | Personal Diary Website",
            description:
                "Secret.Mine is your personal space to document thoughts, moments, and memories — clean, simple, and secure.",
            image: secretMinePreview,
            tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
            github: "private",
            liveLink: "https://secret-mine.vercel.app/",
        },
        {
            title: "PT Fitness",
            description:
                "A gym client booking system where users can view trainer profiles and schedule personal training sessions. Built to simplify trainer-client interactions and session management.",
            image: noImageAvailable,
            tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
            github: "private",
            liveLink: "",
        },
    ];

    // Conditionally show all or just first 4 projects
    const displayedProjects = showAll ? projects : projects.slice(0, 4);

    return (
        <section id="projects" className="bg-secondary/30 py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Section Header */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                    Featured Projects
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedProjects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-muted rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            {/* Project Thumbnail */}
                            <div className="relative overflow-hidden rounded-t-xl aspect-video">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Project Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {project.github && project.github !== "private" && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                Code
                                            </a>
                                        </Button>
                                    )}

                                    {project.github === "private" && (
                                        <Button variant="outline" size="sm" disabled>
                                            <Github className="mr-2 h-4 w-4" />
                                            Private
                                        </Button>
                                    )}

                                    {project.liveLink && (
                                        <Button size="sm" asChild>
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Open
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More / Less Button */}
                {projects.length > 4 && (
                    <div className="text-center pt-8">
                        <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                            {showAll ? "Show Less" : "Show More"}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;