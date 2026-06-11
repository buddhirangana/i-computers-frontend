import { useEffect } from "react";
import { FiShield, FiLock, FiInfo, FiEye } from "react-icons/fi";

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = "Privacy Policy | IONIX Computers";
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <FiInfo className="text-xl text-accent-light" />,
            title: "Information We Collect",
            content: "We collect personal information that you provide to us directly, such as your name, email address, physical shipping address, phone number, and account credentials when you register, configure system builds, or make purchases."
        },
        {
            icon: <FiEye className="text-xl text-accent-light" />,
            title: "How We Use Your Information",
            content: "Your data is used to process orders, manage accounts, provide customer service, deliver official brand warranties, optimize system compatibility checks, and keep you informed about order updates and premium offers."
        },
        {
            icon: <FiLock className="text-xl text-accent-light" />,
            title: "Data Security and Retention",
            content: "We implement rigorous security measures, including data encryption and secure sockets layer (SSL) transactions, to protect your credentials. We retain data only as long as necessary to comply with warranties and tax regulations."
        },
        {
            icon: <FiShield className="text-xl text-accent-light" />,
            title: "Sharing Your Data",
            content: "IONIX Computers does not sell or lease your personal information. We only share essential details with accredited third-party delivery partners (for shipping) and payment processor gateways (to complete transactions securely)."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-6">
            {/* Background Mesh Overlay & Glowing Spotlights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Legal Information</span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">Privacy Policy</h1>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                    <p className="text-xs text-gray-500 mt-2">Last Updated: June 2026</p>
                </div>

                {/* Content Card */}
                <div className="glass-card p-8 sm:p-12 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col gap-10">
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                        At <span className="text-white font-semibold">IONIX Computers</span>, we value your privacy and security. This Privacy Policy details how we handle, protect, and process user data across our platform. By accessing our services, you consent to the practices described in this document.
                    </p>

                    <div className="grid grid-cols-1 gap-8">
                        {sections.map((sec, idx) => (
                            <div key={idx} className="flex gap-4 border-l-2 border-accent/20 pl-5 hover:border-accent transition-colors duration-300">
                                <div className="p-3 bg-white/5 border border-white/5 rounded-xl h-fit shrink-0 text-accent-light">
                                    {sec.icon}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-lg font-bold text-white tracking-wide">{sec.title}</h2>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light">{sec.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/5 pt-8 mt-4 text-xs text-gray-500 leading-relaxed font-light">
                        If you have questions regarding this policy or wish to request the deletion of your account and personal data, please reach out to our legal officer team at <a href="mailto:privacy@ionix.com" className="text-accent hover:underline">privacy@ionix.com</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
