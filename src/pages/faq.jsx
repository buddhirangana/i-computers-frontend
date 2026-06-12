import { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

export default function FAQ() {
    useEffect(() => {
        document.title = "FAQ | IONIX Computers";
        window.scrollTo(0, 0);
    }, []);

    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Are your computer components genuine and sealed?",
            answer: "Yes, 100%. We deal exclusively in brand new, factory-sealed components directly sourced from authorized distributors. Every component is backed by an authentic serial-tracked manufacturer warranty."
        },
        {
            question: "Can I customize a PC configuration build before purchasing?",
            answer: "Absolutely! You can select individual components in our catalog or contact our sales specialists to draft custom builds tailored to your budget and gaming or editing requirements."
        },
        {
            question: "How long does custom PC assembly and testing take?",
            answer: "Standard custom PC assembly, tidy cable routing, OS setup, and strict stress-testing benchmarks are completed within 24 to 48 hours of order confirmation."
        },
        {
            question: "What are your delivery options and timelines across Sri Lanka?",
            answer: "We offer secure, insured courier delivery to any location in Sri Lanka. Delivery usually takes 1-2 business days within Colombo and suburbs, and 2-4 business days for outstations."
        },
        {
            question: "How do I claim a component warranty?",
            answer: "To claim your warranty, simply bring or ship the defective item to any IONIX branch with its serial stickers intact. Make sure to produce the original purchase invoice."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We support Visa, Mastercard, AMEX credit/debit cards, bank transfer payments, and secure online payment gateways. Cash-on-delivery is available for selected component orders."
        }
    ];

    function toggleFaq(index) {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-6">
            {/* Background overlays */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Support Center</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">FAQ</h1>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                    <p className="text-sm text-gray-400 mt-3 font-light">Frequently Asked Questions about our store, builds, and policies.</p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx} 
                                className="glass-card border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors duration-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiHelpCircle className="text-lg text-accent-light group-hover:text-accent transition-colors shrink-0" />
                                        <span className="text-sm sm:text-base font-medium text-white group-hover:text-accent-light transition-colors">{faq.question}</span>
                                    </div>
                                    <div className="text-gray-500 hover:text-white shrink-0 ml-4">
                                        {isOpen ? <FiMinus className="text-lg text-accent" /> : <FiPlus className="text-lg" />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`transition-all duration-300 ease-in-out ${
                                        isOpen ? "max-h-[300px] border-t border-white/5 opacity-100 py-5 px-6" : "max-h-0 opacity-0 pointer-events-none"
                                    }`}
                                >
                                    <p className="text-sm text-gray-400 leading-relaxed font-light">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12 text-xs text-gray-500 font-light">
                    Can't find what you are looking for? Contact our customer support helpline directly or send us an email at <a href="mailto:support@ionixcomputers.lk" className="text-accent hover:underline font-semibold">support@ionixcomputers.lk</a>.
                </div>
            </div>
        </div>
    );
}
