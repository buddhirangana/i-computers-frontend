import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi";

export default function ContactUsPage() {
    useEffect(() => {
        document.title = "Contact Us | iComputers";
    }, []);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            toast.error("Please fill in all the fields.");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Thank you for reaching out! We will get back to you shortly.");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setIsSubmitting(false);
        }, 1200);
    };

    return (
        <div className="w-full min-h-full bg-primary flex flex-col pb-28 text-gray-300">
            {/* Header / Hero Banner */}
            <div className="w-full bg-gradient-to-r from-secondary to-[#0f172a] text-white py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans text-glow-blue">Contact Our Team</h1>
                <p className="text-lg md:text-xl text-blue-200 max-w-2xl font-light">
                    Have questions about component compatibility, product availability, or custom builds? We are here to help!
                </p>
            </div>

            {/* Grid Layout */}
            <div className="max-w-6xl w-full mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                
                {/* Left Side: Contact details */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div>
                        <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Contact Information</span>
                        <h2 className="text-3xl font-bold text-white mt-2 mb-4">Get in Touch</h2>
                        <p className="text-sm text-gray-400">Reach out directly via phone or email, or visit our retail store in Colombo.</p>
                    </div>

                    <div className="flex flex-col gap-5 glass-card p-6 border border-white/8 shadow-lg">
                        {/* Phone */}
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white/5 text-accent-light rounded-xl">
                                <FiPhone className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1">Phone Number</h3>
                                <p className="text-sm text-gray-300">+94 11 234 5678</p>
                                <p className="text-xs text-gray-500 mt-0.5">Mon-Sat, 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white/5 text-accent-light rounded-xl">
                                <FiMail className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1">Email Address</h3>
                                <p className="text-sm text-gray-300 font-medium">support@icomputers.lk</p>
                                <p className="text-sm text-gray-300 font-medium">sales@icomputers.lk</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white/5 text-accent-light rounded-xl">
                                <FiMapPin className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1">Our Location</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    123 Tech Avenue, Galle Road,<br />Colombo 03, Sri Lanka
                                </p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-white/5 text-accent-light rounded-xl">
                                <FiClock className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1">Business Hours</h3>
                                <p className="text-sm text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                <p className="text-sm text-gray-300">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Mock Map Panel */}
                    <div className="w-full aspect-[16/10] bg-[#0b0f19]/30 rounded-2xl border border-white/8 overflow-hidden relative flex flex-col justify-center items-center p-6 text-center text-gray-400 shadow-inner hover:border-accent/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                        <FiMapPin className="text-4xl text-accent-light animate-bounce mb-3 relative z-10" />
                        <h4 className="font-bold text-white text-sm relative z-10">iComputers Store, Colombo</h4>
                        <p className="text-xs text-gray-500 max-w-xs mt-1 relative z-10">Embedded Interactive Map Preview (Colombo 03 Galle Road Intersection)</p>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-3 glass-card p-6 md:p-8 shadow-lg hover:shadow-glow-blue transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                    <p className="text-sm text-gray-400 mb-6">Fill out the form below and our customer support reps will reply within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div className="flex flex-col">
                                <label htmlFor="user-name" className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Full Name</label>
                                <input
                                    id="user-name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary border border-white/10 focus:border-accent rounded-xl text-sm focus:outline-none text-white transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="user-email" className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    id="user-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary border border-white/10 focus:border-accent rounded-xl text-sm focus:outline-none text-white transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col">
                            <label htmlFor="msg-subject" className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Subject</label>
                            <input
                                id="msg-subject"
                                type="text"
                                placeholder="What is your query about?"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary border border-white/10 focus:border-accent rounded-xl text-sm focus:outline-none text-white transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col">
                            <label htmlFor="msg-text" className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Message Description</label>
                            <textarea
                                id="msg-text"
                                rows="6"
                                placeholder="Describe your query in detail..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary border border-white/10 focus:border-accent rounded-xl text-sm focus:outline-none text-white transition-all duration-200 resize-none"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-accent text-white font-bold rounded-xl text-sm shadow hover:bg-accent-dark hover:shadow-glow-blue disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isSubmitting ? (
                                "Submitting message..."
                            ) : (
                                <>
                                    <FiSend />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
