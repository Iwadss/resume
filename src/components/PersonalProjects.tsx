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

import personalProjectsData from "@/data/personalProjects.json";

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

const imageMap: Record<string, string> = {
    secretMinePreview,
    noImageAvailable,
};

// ==============================
// Personal Projects Component
// ==============================

const PersonalProjects = () => {
    const [showAll, setShowAll] = useState(false); // Toggles visibility of all projects

    // Project list mapped from JSON
    const projects: Project[] = personalProjectsData.map((project) => ({
        ...project,
        image: imageMap[project.image] || project.image,
    }));

    // Conditionally show all or just first 4 projects
    const displayedProjects = showAll ? projects : projects.slice(0, 4);

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Sub-Header */}
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-center md:text-left">
                    Personal Projects
                </h3>
                <p className="text-muted-foreground text-center md:text-left mt-3 md:mt-4">
                    Independent projects built to explore technologies and solve real-world problems.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
                {displayedProjects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-muted rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
                    >
                        {/* Project Thumbnail */}
                        <div className="relative overflow-hidden rounded-t-xl aspect-video shrink-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Project Details */}
                        <div className="p-8 flex flex-col flex-1">
                            <div>
                                <h4 className="text-xl font-semibold leading-tight">{project.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                                    {project.description}
                                </p>
                            </div>

                            {/* Spacer to push tags and buttons to the bottom */}
                            <div className="flex-1" />

                            {/* Project Tags */}
                            <div className="mt-5 flex flex-wrap gap-2.5">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-6">
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
                <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Less" : "Show More"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PersonalProjects;
