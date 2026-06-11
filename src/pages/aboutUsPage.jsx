import { useEffect } from "react";
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
            icon: <FiCpu className="text-3xl text-accent" />
        },
        {
            id: 2,
            title: "Expert PC Building",
            description: "Our technicians are gaming and workstation enthusiasts who meticulously assemble, wire-manage, and stress-test every build.",
            icon: <FiAward className="text-3xl text-accent" />
        },
        {
            id: 3,
            title: "Customer-First Support",
            description: "From component selection guidance to post-purchase troubleshooting, our dedicated team is always ready to assist.",
            icon: <FiUsers className="text-3xl text-accent" />
        },
        {
            id: 4,
            title: "Tech Innovation",
            description: "We constantly stay updated with the latest CPU, GPU, and architecture launches to offer state-of-the-art specs first.",
            icon: <FiTrendingUp className="text-3xl text-accent" />
        }
    ];

    return (
        <div className="w-full min-h-full bg-primary flex flex-col pb-28 text-gray-300">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-r from-secondary to-[#0f172a] text-white py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center border-b border-white/5">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans text-glow-blue">About iComputers</h1>
                <p className="text-lg md:text-xl text-blue-200 max-w-2xl font-light">
                    Your premier destination for high-performance computing, custom gaming rigs, and professional workstation hardware in Sri Lanka.
                </p>
            </div>

            {/* Who We Are Section */}
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2">Our Story</span>
                    <h2 className="text-3xl font-bold text-white mb-6">Empowering Tech Enthusiasts Since 2020</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        Founded with a vision to revolutionize the PC building landscape, I Computers has grown from a passionate team of tech geeks into one of the most trusted computer hardware stores in the country.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        We specialize in custom gaming PCs, high-end workstations, server deployment, and high-quality accessories. We don't just sell components; we curate experiences tailored to your creative, gaming, and professional needs.
                    </p>
                    <div className="flex flex-col gap-3 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                            <FiCheckCircle className="text-accent-light text-lg shrink-0" />
                            <span>Authorized dealer of top global brands (ASUS, MSI, Corsair, Intel, AMD)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                            <FiCheckCircle className="text-accent-light text-lg shrink-0" />
                            <span>Professional stress-testing and benchmark reports provided</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col gap-6 justify-center shadow-lg hover:shadow-glow-blue transition-all duration-300">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
                    
                    <div className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/8 hover:border-accent/30 transition-all duration-300">
                        <div className="p-3 bg-white/5 rounded-xl">
                            <FiCompass className="text-2xl text-accent-light" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-2">Our Mission</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                To provide premium, high-performance computing hardware backed by unparalleled technical support, enabling gamers, creators, and developers to push their boundaries.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/8 hover:border-accent/30 transition-all duration-300">
                        <div className="p-3 bg-white/5 rounded-xl">
                            <FiEye className="text-2xl text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-2">Our Vision</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                To be recognized as the ultimate landmark for custom PC builds and server hardware solutions, fostering a thriving technology ecosystem across Sri Lanka.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Banner */}
            <div className="w-full bg-white/3 border-y border-white/8 py-12 px-6 backdrop-blur-md">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center text-center">
                            <span className="text-3xl md:text-4xl font-extrabold text-accent-light mb-2">{stat.value}</span>
                            <span className="text-sm text-gray-400 font-semibold">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Values Section */}
            <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">How We Stand Out</span>
                    <h2 className="text-3xl font-bold text-white mt-2">Our Core Values</h2>
                    <p className="text-sm text-gray-400 mt-2">Every component we ship and build we assemble is guided by our values</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((val) => (
                        <div key={val.id} className="glass-card p-6 flex gap-4 hover:border-accent/40 hover:shadow-glow-blue transition-all duration-300">
                            <div className="p-3 bg-white/5 rounded-xl shrink-0 h-fit">
                                {val.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg mb-2">{val.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{val.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
