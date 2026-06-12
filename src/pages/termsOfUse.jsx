import { useEffect } from "react";
import { FiAlertTriangle, FiBookOpen, FiFileText, FiUserCheck } from "react-icons/fi";

export default function TermsOfUse() {
    useEffect(() => {
        document.title = "Terms of Use | IONIX Computers";
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <FiBookOpen className="text-xl text-accent-light" />,
            title: "Agreement to Terms",
            content: "By accessing or placing an order on the IONIX Computers website, you agree to comply with and be bound by these Terms of Use and our policies. If you disagree, please discontinue use immediately."
        },
        {
            icon: <FiUserCheck className="text-xl text-accent-light" />,
            title: "Account Responsibilities",
            content: "When registering on our platform, you are responsible for maintaining the confidentiality of your credentials and restrict access to unauthorized parties. You agree to accept liability for actions originating from your account."
        },
        {
            icon: <FiFileText className="text-xl text-accent-light" />,
            title: "Product Accuracy & Orders",
            content: "We make every effort to display accurate specs, pricing, and stock levels. However, pricing errors or system inventory synchronization delays can occur. We reserve the right to cancel or modify orders matching erroneous specifications."
        },
        {
            icon: <FiAlertTriangle className="text-xl text-accent-light" />,
            title: "Limitations of Liability",
            content: "IONIX Computers shall not be held liable for direct, indirect, incidental, or consequential damage to components, system builds, or lost data resulting from custom modifications, user overclocking, or incorrect physical installation."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-6">
            {/* Background overlays */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Legal Information</span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">Terms of Use</h1>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                    <p className="text-xs text-gray-500 mt-2">Last Updated: June 2026</p>
                </div>

                {/* Content Card */}
                <div className="glass-card p-8 sm:p-12 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col gap-10">
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                        Please review these Terms of Use carefully. They govern your utilization of the <span className="text-white font-semibold">IONIX Computers</span> marketplace platform, transactions, and custom configuration builder services.
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
                        If you have questions, please reach out to our legal officer team at <a href="mailto:support@ionix.com" className="text-accent hover:underline">support@ionix.com</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
