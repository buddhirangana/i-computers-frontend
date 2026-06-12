import { useEffect } from "react";
import { FiRefreshCw, FiClock, FiFileText, FiAlertCircle } from "react-icons/fi";

export default function ReturnsRefunds() {
    useEffect(() => {
        document.title = "Returns & Refunds | IONIX Computers";
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <FiRefreshCw className="text-xl text-accent-light" />,
            title: "Eligibility for Returns",
            content: "Components and peripherals may be returned within 7 days of purchase. The item must be in its original, sealed box packaging with all original seals intact, and must be free of physical scratches or damage."
        },
        {
            icon: <FiAlertCircle className="text-xl text-accent-light" />,
            title: "Non-Returnable Items",
            content: "Custom PC builds, opened processor boxes, motherboard packages with bent sockets, software licenses, thermal compounds, or items damaged by user assembly errors or power surges are non-returnable."
        },
        {
            icon: <FiClock className="text-xl text-accent-light" />,
            title: "Refund Process & Timelines",
            content: "Once we receive and inspect your item, we will issue a bank refund within 5-7 business days. Credit card refunds will appear on your statement within the timeline set by your issuing bank."
        },
        {
            icon: <FiFileText className="text-xl text-accent-light" />,
            title: "Return Shipping Fees",
            content: "Customers are responsible for shipping fees for item returns unless the return is a result of a verified hardware defect present upon delivery. All returns must have their original invoices."
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
                    <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Store Policies</span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">Returns & Refunds</h1>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                    <p className="text-xs text-gray-500 mt-2">Last Updated: June 2026</p>
                </div>

                {/* Content Card */}
                <div className="glass-card p-8 sm:p-12 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col gap-10">
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                        We aim for complete customer satisfaction. If you are not satisfied with your purchase, please review our return eligibility and processing guidelines.
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
                        To initiate a return request, please contact our support desk at <a href="mailto:support@ionix.com" className="text-accent hover:underline">support@ionix.com</a> or visit our showrooms.
                    </div>
                </div>
            </div>
        </div>
    );
}
