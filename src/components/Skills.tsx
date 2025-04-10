import React from "react";
import {
    Database,
    Layout,
    Server,
    Globe,
    Terminal,
    PenTool,
    Smartphone,
    Code,
} from "lucide-react";

interface SkillItem {
    name: string;
    image: string;
}

interface SkillCategory {
    name: string;
    icon: React.ReactNode;
    skills: SkillItem[];
}

const Skills = () => {
    const skillCategories: SkillCategory[] = [
        {
            name: "Frontend",
            icon: <Layout className="w-10 h-10 text-primary" />,
            skills: [
                { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "Tailwind CSS", image: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
            ],
        },
        {
            name: "Backend",
            icon: <Server className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "RESTful APIs", image: "https://img.icons8.com/ios/50/api-settings.png" },
                { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "PHP", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                { name: "C# (.NET)", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
            ],
        },
        {
            name: "Database",
            icon: <Database className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Supabase", image: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
                { name: "MySQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { name: "Firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            ],
        },
        {
            name: "Mobile Dev",
            icon: <Smartphone className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Flutter", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
                { name: "Dart", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
                { name: "React Native", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            ],
        },
        {
            name: "Tools",
            icon: <Terminal className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Vite", image: "https://vitejs.dev/logo.svg" },
                { name: "npm", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
                { name: "yarn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg" },
                { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "VS Code", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },

            ],
        },
        {
            name: "Design",
            icon: <PenTool className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Figma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                { name: "UI/UX", image: "https://img.icons8.com/color/48/design.png" },
                { name: "Responsive Design", image: "https://img.icons8.com/fluency/48/iphone.png" },
                { name: "Wireframing", image: "https://img.icons8.com/fluency/48/flow-chart.png" },
            ],
        },
        {
            name: "Deployment",
            icon: <Globe className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Vercel", image: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" },
                { name: "Netlify", image: "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg" },
            ],
        },
        {
            name: "Programming Languages",
            icon: <Code className="w-10 h-10 text-primary" />,
            skills: [
                { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", },
                { name: "C#", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", },
                { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", },
                { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", },
            ],
        }
    ];

    return (
        <section id="skills" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center md:text-left">
                    Skills & Expertise
                </h2>

                {/* Grid with 4 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white dark:bg-muted rounded-2xl shadow-sm divide-y divide-border overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-primary/20"
                        >
                            <div className="flex items-center gap-4 p-4">
                                {category.icon}
                                <div>
                                    <p className="font-semibold text-base">{category.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {category.skills.slice(0, 2).map((s) => s.name).join(", ")}...
                                    </p>
                                </div>
                            </div>
                            <ul className="max-h-32 overflow-y-auto">
                                {category.skills.map((skill) => (
                                    <li
                                        key={skill.name}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent transition"
                                    >
                                        <img
                                            src={skill.image}
                                            alt={skill.name}
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span>{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;