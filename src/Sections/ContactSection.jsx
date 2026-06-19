"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
    const contacts = [
        {
            icon: Phone,
            title: "Phone Number",
            value: "+1 (800) 555-0199",
            href: "tel:+1 (800) 555-0199",
            color: "hover:bg-linear-to-r hover:from-[#0a3d62] hover:to-[#3498db] hover:text-white hover:border-transparent",
        },
        {
            icon: Mail,
            title: "Email Address",
            value: "info@rentease.com",
            href: "mailto:info@rentease.com",
            color: "hover:bg-linear-to-r hover:from-[#0a3d62] hover:to-[#3498db] hover:text-white hover:border-transparent",
        },
        {
            icon: FaWhatsapp,
            title: "WhatsApp Chat",
            value: "+1 (800) 555-0199",
            href: "https://wa.me/+1 (800) 555-0199",
            color: "hover:bg-linear-to-r hover:from-[#0a3d62] hover:to-[#3498db] hover:text-white hover:border-transparent",
        },
        {
            icon: MapPin,
            title: "Headquarters",
            value: " RentEase Plaza, San Francisco",
            href: "https://maps.app.goo.gl",
            color: "hover:bg-linear-to-r hover:from-[#0a3d62] hover:to-[#3498db] hover:text-white hover:border-transparent",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50 rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#3498db]/10 via-transparent to-transparent opacity-50 blur-2xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-[#3498db]/10 text-[#0a3d62] text-sm font-semibold mb-4 shadow-sm border border-[#3498db]/20">
                        Get In Touch
                    </span>
                    <div className="mb-10">
                        <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                            Contact Info
                        </h2>
                        <div className="w-20 h-1.5 bg-linear-to-r from-[#0a3d62] to-[#3498db] mx-auto rounded-full mb-6"></div>
                        <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                            Reach out to our dedicated support team for inquiries or partnerships.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={index}
                            variants={item}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center p-8 glass rounded-3xl group transition-all duration-300 border border-border shadow-sm hover:shadow-xl ${contact.color} hover:-translate-y-1`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#3498db]/10 flex items-center justify-center mb-6 text-[#0a3d62] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                                <contact.icon size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-foreground group-hover:text-current mb-2 transition-colors duration-300">
                                {contact.title}
                            </h4>
                            <p className="text-sm font-medium text-muted-foreground text-center group-hover:text-current/90 transition-colors duration-300">
                                {contact.value}
                            </p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;