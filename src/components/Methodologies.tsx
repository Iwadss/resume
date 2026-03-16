import { Repeat2, Users, Layers, GitBranch } from "lucide-react";

// ==============================
// Methodologies Component
// ==============================

const methodologies = [
    {
        name: "Agile",
        icon: <Repeat2 className="w-7 h-7" />,
        description: "Iterative delivery with continuous feedback loops and adaptive planning.",
        color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
        border: "border-blue-100 dark:border-blue-900",
    },
    {
        name: "Scrum",
        icon: <Users className="w-7 h-7" />,
        description: "Sprint-based framework with daily standups, retrospectives, and cross-functional teams.",
        color: "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
        border: "border-violet-100 dark:border-violet-900",
    },
    {
        name: "SAFe",
        icon: <Layers className="w-7 h-7" />,
        description: "Scaled Agile Framework for enterprise-level coordination across multiple Agile teams.",
        color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-100 dark:border-emerald-900",
    },
    {
        name: "SDLC",
        icon: <GitBranch className="w-7 h-7" />,
        description: "Structured Software Development Life Cycle covering planning, design, build, test, and release.",
        color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
        border: "border-orange-100 dark:border-orange-900",
    },
];

const Methodologies = () => {
    return (
        <section id="methodologies" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Section Heading */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center md:text-left">
                        Methodologies
                    </h2>
                    <p className="text-muted-foreground text-center md:text-left">
                        Engineering and delivery practices I work with
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {methodologies.map((method) => (
                        <div
                            key={method.name}
                            className={`rounded-2xl border ${method.border} bg-white dark:bg-muted p-6 shadow-sm hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-primary/20 transition-all duration-300`}
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${method.color} mb-4`}>
                                {method.icon}
                            </div>

                            {/* Name */}
                            <h3 className="font-bold text-lg mb-1">{method.name}</h3>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {method.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodologies;
