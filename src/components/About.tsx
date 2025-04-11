// Utility function to calculate age based on birth date
const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // Adjust if the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

const About = () => {
    const age = calculateAge("2002-11-20");

    return (
        <section id="about" className="bg-secondary/30 py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Section Heading */}
                <h2 className="text-4xl font-bold tracking-tight text-center md:text-left">
                    About Me
                </h2>

                {/* Content Layout: 2 Columns - Text & Summary Card */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* ================================
                        Left Column: Introduction & Bio
                    ================================== */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            I’m a highly motivated Software Engineering student at Universiti Kuala Lumpur MIIT
                            with a strong passion for full-stack development and clean, user-focused design.
                            I enjoy solving real-world problems through digital experiences that are both intuitive and efficient.
                        </p>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Through my academic journey and hands-on project experience, I've developed a
                            keen eye for detail and a mindset focused on usability, performance, and accessibility.
                            I find great satisfaction in turning ideas into polished and impactful digital solutions.
                        </p>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Outside of coding, I enjoy hiking, gym workouts, and visiting nature to unwind and recharge.
                            I’m also curious about new technologies, and always eager to learn, grow, and collaborate on meaningful projects.
                        </p>
                    </div>

                    {/* ================================
                        Right Column: Quick Info Card
                    ================================== */}
                    <div className="w-full flex justify-center md:justify-end">
                        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full max-w-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] hover:ring-2 hover:ring-primary/20">
                            <h3 className="text-xl font-semibold mb-4">At a Glance</h3>
                            <ul className="space-y-2 text-sm md:text-base">
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Name:</span>
                                    <span>Muhammad Ifwad Bin Ismail</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Age:</span>
                                    <span>{age} years</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Location:</span>
                                    <span className="text-right">Federal Territory of Kuala Lumpur, Malaysia</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Education:</span>
                                    <span className="text-right">
                                        Bachelor of Information Technology (Hons.) in Software Engineering
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Languages:</span>
                                    <span>Malay, English</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="font-medium text-muted-foreground">Interests:</span>
                                    <span className="text-right">Hiking, Gym Workout, Nature Exploration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;