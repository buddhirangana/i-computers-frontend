import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCpu, FiAward, FiUsers, FiTrendingUp, FiCompass, FiEye, FiCheckCircle } from "react-icons/fi";

export default function AboutUsPage() {
    useEffect(() => {
        document.title = "About Us | IONIX Computers";
    }, []);

    const stats = [
        { id: 1, label: "Custom Builds Completed", value: "15,000+" },
        { id: 2, label: "Satisfied Customers", value: "99.8%" },
        { id: 3, label: "Years of Excellence", value: "5+" },
        { id: 4, label: "Genuine Brands", value: "50+" }
    ];

    const values = [
        {
            id: 1,
            title: "Premium Quality",
            description: "We strictly source 100% authentic products and components from globally renowned manufacturers with full official warranty support.",
            icon: <FiCpu className="text-2xl text-accent-light" />
        },
        {
            id: 2,
            title: "Expert PC Building",
            description: "Our technicians are gaming and workstation enthusiasts who meticulously assemble, wire-manage, and stress-test every build.",
            icon: <FiAward className="text-2xl text-accent-light" />
        },
        {
            id: 3,
            title: "Customer-First Support",
            description: "From component selection guidance to post-purchase troubleshooting, our dedicated team is always ready to assist.",
            icon: <FiUsers className="text-2xl text-accent-light" />
        },
        {
            id: 4,
            title: "Tech Innovation",
            description: "We constantly stay updated with the latest CPU, GPU, and architecture launches to offer state-of-the-art specs first.",
            icon: <FiTrendingUp className="text-2xl text-accent-light" />
        }
    ];

    return (
        <div className="w-full min-h-full bg-primary flex flex-col pb-28 text-gray-300">
            {/* Hero Section with Ambient Mesh Glow */}
            <div className="relative w-full bg-gradient-to-b from-[#0b0f19] to-[#030712] text-white py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans text-glow-blue relative z-10">
                    About IONIX Computers
                </h1>
                <p className="text-base md:text-lg text-blue-200 max-w-2xl font-light relative z-10 leading-relaxed">
                    Your premier destination for high-performance computing, custom gaming rigs, and professional workstation hardware in Sri Lanka.
                </p>
            </div>

            {/* Who We Are & Mission/Vision Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Our Story */}
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">Our Story</span>
                        <h2 className="text-3xl font-extrabold text-white">Empowering Tech Enthusiasts Since 2020</h2>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Founded with a vision to revolutionize the PC building landscape, IONIX Computers has grown from a passionate team of tech geeks into one of the most trusted computer hardware stores in the country.
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        We specialize in custom gaming PCs, high-end workstations, server deployment, and high-quality accessories. We don't just sell components; we curate experiences tailored to your creative, gaming, and professional needs.
                    </p>
                    <div className="flex flex-col gap-3.5 mt-2">
                        <div className="flex items-center gap-3 text-sm text-gray-300 font-semibold">
                            <FiCheckCircle className="text-accent-light text-lg shrink-0" />
                            <span>Authorized dealer of top global brands (ASUS, MSI, Corsair, Intel, AMD)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300 font-semibold">
                            <FiCheckCircle className="text-accent-light text-lg shrink-0" />
                            <span>Professional stress-testing and benchmark reports provided</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Mission & Vision Glassmorphic Cards */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col gap-6 justify-center shadow-2xl border border-white/5">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Mission Card */}
                    <div className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/8 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02] shadow-md">
                        <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl">
                            <FiCompass className="text-2xl text-accent-light" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-white text-base mb-2 uppercase tracking-wide">Our Mission</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                To provide premium, high-performance computing hardware backed by unparalleled technical support, enabling gamers, creators, and developers to push their boundaries.
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] shadow-md">
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                            <FiEye className="text-2xl text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-white text-base mb-2 uppercase tracking-wide">Our Vision</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                To be recognized as the ultimate landmark for custom PC builds and server hardware solutions, fostering a thriving technology ecosystem across Sri Lanka.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Banner (Modern Enclosed Glass Card) */}
            <div className="max-w-[1440px] w-full mx-auto px-6 mt-4 mb-8">
                <div className="w-full glass-card border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center text-center">
                            <span className="text-3xl md:text-4xl font-extrabold text-accent-light mb-1.5 text-glow-blue">{stat.value}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Values Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-12 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider block">How We Stand Out</span>
                    <h2 className="text-3xl font-extrabold text-white">Our Core Values</h2>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed">Every component we ship and build we assemble is guided by our values</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((val) => (
                        <div key={val.id} className="glass-card p-6 flex gap-4 border border-white/8 hover:border-accent/30 hover:shadow-glow-blue hover:-translate-y-1 transition-all duration-300 shadow-md">
                            <div className="p-3 bg-accent/10 border border-accent/20 rounded-2xl shrink-0 h-fit flex items-center justify-center">
                                {val.icon}
                            </div>
                            <div>
                                <h3 className="font-extrabold text-white text-base mb-1.5 uppercase tracking-wide">{val.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{val.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Call to Action (CTA) Section */}
            <div className="max-w-7xl w-[90%] mx-auto mt-12 bg-gradient-to-r from-accent/20 via-[#0b0f19] to-purple-500/10 border border-white/8 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex flex-col gap-2.5 max-w-xl text-center md:text-left">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Ready to Build Your Dream Custom PC?</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Consult with our expert technicians to customize, stress-test, and assemble a machine tailored for you.
                    </p>
                </div>
                <Link 
                    to="/products" 
                    className="px-6 py-3.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg hover:shadow-glow-blue transition-all duration-200 text-sm whitespace-nowrap cursor-pointer hover:scale-105"
                >
                    Build Your PC Now
                </Link>
            </div>
        </div>
    );
}
