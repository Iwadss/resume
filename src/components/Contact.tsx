import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Message sent!", {
                    description: "Thank you for reaching out. I'll get back to you soon.",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                toast.error(result.error || "Failed to send message.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto space-y-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                    Get In Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            I'm currently open for freelance work and new opportunities. Whether you have a
                            project in mind, a question, or just want to connect — feel free to reach out!
                        </p>

                        <div className="space-y-4">
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

                    {/* Contact Form */}
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            <Textarea
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
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
