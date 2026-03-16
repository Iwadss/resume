import { Award, ShieldCheck, ExternalLink, CalendarCheck, Hash } from "lucide-react";

import certificationsData from "@/data/certifications.json";

// ==============================
// Certifications Component
// ==============================

interface Certification {
    name: string;
    issuer: string;
    issuedTo: string;
    examCode: string;
    credentialId: string;
    verificationCode: string;
    date: string;
    expiry: string;
    status: string;
    logo: string;
    description: string;
    skills: string[];
    verifyUrl: string;
    credlyUrl: string;
    color: string;
}

const certifications: Certification[] = certificationsData;

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 px-6 md:px-12 lg:px-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Section Heading */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center md:text-left">
                        Certifications
                    </h2>
                    <p className="text-muted-foreground text-center md:text-left">
                        Industry-recognised credentials and qualifications
                    </p>
                </div>

                {/* Certification Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-muted rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-primary/20 overflow-hidden"
                        >
                            {/* Top gradient accent bar */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

                            <div className="p-8 space-y-6">
                                {/* Header Row */}
                                <div className="flex items-start gap-4">
                                    {/* Badge Icon */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center p-1.5">
                                        <img
                                            src={cert.logo}
                                            alt={cert.issuer}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                const el = e.target as HTMLImageElement;
                                                el.style.display = "none";
                                                el.parentElement!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`;
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base leading-snug">{cert.name}</h3>
                                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                                {cert.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {cert.description}
                                </p>

                                {/* Meta details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarCheck className="w-3.5 h-3.5 flex-shrink-0 text-sky-500" />
                                        <span><span className="font-medium text-foreground">Issued:</span> {cert.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CalendarCheck className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                                        <span><span className="font-medium text-foreground">Expires:</span> {cert.expiry}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:col-span-2">
                                        <Hash className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                                        <span className="font-mono truncate">
                                            <span className="font-medium not-italic text-foreground">ID:</span> {cert.credentialId}
                                        </span>
                                    </div>
                                </div>

                                {/* Skill Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {cert.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Verify Links */}
                                <div className="flex flex-wrap gap-3 pt-1 border-t border-border">
                                    <a
                                        href={cert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group"
                                    >
                                        <Award className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                        Verify on CompTIA
                                        <ExternalLink className="w-3 h-3 group-hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href={cert.credlyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group"
                                    >
                                        <Award className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                        View Credly Badge
                                        <ExternalLink className="w-3 h-3 group-hover:text-primary transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
