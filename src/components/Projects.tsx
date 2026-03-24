import EnterpriseProjects from "./EnterpriseProjects";
import PersonalProjects from "./PersonalProjects";

// ==============================
// Common Projects unified Wrapper
// ==============================

const Projects = () => {
    return (
        <section id="projects" className="bg-secondary/30 py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
                
                {/* Main Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Engineering work from enterprise environments and personal development projects.
                    </p>
                </div>

                {/* Subsections */}
                <div className="space-y-20">
                    <EnterpriseProjects />
                    <PersonalProjects />
                </div>
                
            </div>
        </section>
    );
};

export default Projects;