import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <section
            id="contact"
            className="py-20 px-6 md:px-12 lg:px-20 bg-background"
        >
            <div className="max-w-7xl mx-auto space-y-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                    Get In Touch
                </h2>

                {/* Layout */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left: Text & Info */}
                    <div className="space-y-8">
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            I'm currently open for freelance work and new opportunities.
                            Whether you have a project in mind, a question, or just want to
                            connect — feel free to reach out!
                        </p>

                        <div className="space-y-6">
                            <ContactItem
                                icon={<Mail className="h-5 w-5 text-primary" />}
                                label="Email"
                                value="iwadss99@gmail.com"
                                link="mailto:iwadss99@gmail.com"
                            />
                            <ContactItem
                                icon={<Phone className="h-5 w-5 text-primary" />}
                                label="Phone"
                                value="+60 17-592 9050"
                                link="tel:+60175929050"
                            />
                            <ContactItem
                                icon={<MapPin className="h-5 w-5 text-primary" />}
                                label="Location"
                                value="Federal Territory of Kuala Lumpur, Malaysia"
                            />
                        </div>
                    </div>

                    {/* Right: Google Map */}
                    <div className="flex items-center justify-center">
                        <div className="w-full h-64 md:h-80 rounded-xl border border-border overflow-hidden">
                            <iframe
                                title="UniKL MIIT Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.8387359148293!2d101.69823039999999!3d3.1576469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49f84cb5f97f%3A0xd0d260cdbba7f82d!2sUniversiti%20Kuala%20Lumpur%20-%20MIIT!5e0!3m2!1sen!2smy!4v1712818874820"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                className="w-full h-full rounded-xl border border-border"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactItem = ({
    icon,
    label,
    value,
    link,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    link?: string;
}) => (
    <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <div>
            <p className="font-medium">{label}</p>
            {link ? (
                <a
                    href={link}
                    className="text-muted-foreground hover:text-primary transition"
                >
                    {value}
                </a>
            ) : (
                <p className="text-muted-foreground">{value}</p>
            )}
        </div>
    </div>
);

export default Contact;