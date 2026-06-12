import { useEffect } from "react";
import { FiCheckCircle, FiAlertOctagon, FiSend, FiHelpCircle } from "react-icons/fi";

export default function Warranty() {
    useEffect(() => {
        document.title = "Warranty Policy | IONIX Computers";
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <FiCheckCircle className="text-xl text-accent-light" />,
            title: "Warranty Coverage Duration",
            content: "All brand new components carry their respective official manufacturer warranty, typically ranging from 1 to 5 years. Standard durations: Processors (3 years), Motherboards (3 years), RAM (Lifetime / Limited), and GPUs (3 years)."
        },
        {
            icon: <FiAlertOctagon className="text-xl text-accent-light" />,
            title: "Warranty Exclusions",
            content: "Warranty does not cover items with bent pins, burnt circuits, physical scratches, liquid damage, third-party bios flashes, or items damaged due to improper assembly or power line surges."
        },
        {
            icon: <FiSend className="text-xl text-accent-light" />,
            title: "How to Claim Warranty",
            content: "Bring the component to any IONIX branch with the original invoice and serial number stickers intact. Our technical department will verify the serial number, stress test the unit, and initiate replacement routing."
        },
        {
            icon: <FiHelpCircle className="text-xl text-accent-light" />,
            title: "Warranty Processing Timelines",
            content: "Standard warranty diagnostics and replacement take 7-14 business days. If direct manufacturer replacement requires overseas shipping, it may extend up to 3-4 weeks. We will notify you once ready."
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
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">Warranty Policy</h1>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                    <p className="text-xs text-gray-500 mt-2">Last Updated: June 2026</p>
                </div>

                {/* Content Card */}
                <div className="glass-card p-8 sm:p-12 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col gap-10">
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                        At <span className="text-white font-semibold">IONIX Computers</span>, we deal exclusively in 100% genuine components carrying full manufacturer warranties. Please read our warranty claim steps and exclusions below.
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
                        For online claims or serial status queries, please write to our warranty team at <a href="mailto:warranty@ionix.com" className="text-accent hover:underline">warranty@ionix.com</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
