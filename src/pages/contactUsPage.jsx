import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi";

export default function ContactUsPage() {
    useEffect(() => {
        document.title = "Contact Us | IONIX Computers";
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
            {/* Header / Hero Banner with Ambient Mesh Glow */}
            <div className="relative w-full bg-gradient-to-b from-[#0b0f19] to-[#030712] text-white py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans text-glow-blue relative z-10">
                    Contact Our Team
                </h1>
                <p className="text-base md:text-lg text-blue-200 max-w-2xl font-light relative z-10 leading-relaxed">
                    Have questions about component compatibility, product availability, or custom builds? We are here to help!
                </p>
            </div>

            {/* Grid Layout */}
            <div className="max-w-[1440px] w-full mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                
                {/* Left Side: Contact details */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div>
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">Contact Information</span>
                        <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
                        <p className="text-sm text-gray-400 mt-2">Reach out directly via phone or email, or visit our retail store in Colombo.</p>
                    </div>

                    <div className="flex flex-col gap-5 glass-card p-6 border border-white/5 shadow-2xl">
                        {/* Phone */}
                        <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300">
                            <div className="p-3 bg-accent/10 border border-accent/20 text-accent-light rounded-xl shrink-0">
                                <FiPhone className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Phone Number</h3>
                                <p className="text-sm text-gray-300 font-semibold">+94 75 647 7093</p>
                                <p className="text-xs text-gray-500 mt-1">Mon-Sat: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300">
                            <div className="p-3 bg-accent/10 border border-accent/20 text-accent-light rounded-xl shrink-0">
                                <FiMail className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Email Address</h3>
                                <p className="text-sm text-gray-300 font-semibold">support@ionixcomputers.lk</p>
                                <p className="text-sm text-gray-300 font-semibold mt-0.5">sales@ionixcomputers.lk</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300">
                            <div className="p-3 bg-accent/10 border border-accent/20 text-accent-light rounded-xl shrink-0">
                                <FiMapPin className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Our Location</h3>
                                <p className="text-sm text-gray-300 font-semibold leading-relaxed">
                                    123 Tech Avenue, Galle Road,<br />Colombo 03, Sri Lanka
                                </p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300">
                            <div className="p-3 bg-accent/10 border border-accent/20 text-accent-light rounded-xl shrink-0">
                                <FiClock className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Business Hours</h3>
                                <p className="text-sm text-gray-300 font-semibold">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                <p className="text-sm text-red-400 font-semibold mt-0.5">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Mock Map Panel with Locator Micro-animation */}
                    <div className="w-full aspect-[16/10] bg-[#0b0f19]/30 rounded-3xl border border-white/8 overflow-hidden relative flex flex-col justify-center items-center p-6 text-center text-gray-400 shadow-inner hover:border-accent/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                        <div className="relative flex items-center justify-center mb-3">
                            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-accent/30 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border border-white/20 shadow-md"></span>
                        </div>
                        <h4 className="font-bold text-white text-sm relative z-10 uppercase tracking-wide">IONIX Computers Store</h4>
                        <p className="text-xs text-gray-500 max-w-xs mt-1 relative z-10 leading-relaxed">Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-3 glass-card p-6 md:p-10 shadow-2xl hover:shadow-glow-blue hover:border-accent/20 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-1.5">Send Us a Message</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">Fill out the form below and our customer support reps will reply within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex flex-col">
                                <label htmlFor="user-name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Full Name</label>
                                <input
                                    id="user-name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary/40 border border-white/8 focus:border-accent rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-accent/25 transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="user-email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Email Address</label>
                                <input
                                    id="user-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary/40 border border-white/8 focus:border-accent rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-accent/25 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col">
                            <label htmlFor="msg-subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Subject</label>
                            <input
                                id="msg-subject"
                                type="text"
                                placeholder="What is your query about?"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary/40 border border-white/8 focus:border-accent rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-accent/25 transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col">
                            <label htmlFor="msg-text" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Message Description</label>
                            <textarea
                                id="msg-text"
                                rows="6"
                                placeholder="Describe your query in detail..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 bg-white/5 hover:bg-white/10 focus:bg-secondary/40 border border-white/8 focus:border-accent rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-accent/25 transition-all duration-200 resize-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-accent text-white font-semibold rounded-xl text-sm shadow hover:bg-accent-dark hover:shadow-glow-blue disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                        >
                            {isSubmitting ? (
                                "Submitting message..."
                            ) : (
                                <>
                                    <FiSend className="text-base" />
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
