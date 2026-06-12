import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiCpu, FiAward, FiUsers, FiTrendingUp, FiShield, FiCheckCircle, FiTruck, FiStar, FiChevronRight } from "react-icons/fi";
import ProductCard from "../components/productCard";

export default function LandingPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const buildPresets = [
        {
            id: "esports",
            name: "Esports Entry",
            tag: "High FPS at 1080p",
            price: "LKR 185,000+",
            themeColor: "from-cyan-500 to-blue-600",
            glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.2)] border-cyan-500/30",
            specs: {
                cpu: "AMD Ryzen 5 5600",
                gpu: "NVIDIA RTX 4060 8GB",
                ram: "16GB DDR4 3200MHz RGB",
                storage: "512GB NVMe M.2 SSD",
                cooler: "Tower Air Cooler RGB",
                psu: "550W 80+ Bronze Modular",
                case: "IONIX Spark Micro-ATX (Black)"
            },
            img: "/images/pc_setup/pc-build-1.png"
        },
        {
            id: "cyberpunk",
            name: "Cyberpunk Pro",
            tag: "Ultra Specs with Ray Tracing",
            price: "LKR 345,000+",
            themeColor: "from-amber-400 to-rose-600",
            glowColor: "shadow-[0_0_30px_rgba(244,63,94,0.2)] border-rose-500/30",
            specs: {
                cpu: "Intel Core i5-14600K",
                gpu: "NVIDIA RTX 4070 Super 12GB",
                ram: "32GB DDR5 6000MHz RGB",
                storage: "1TB Gen4 NVMe SSD",
                cooler: "240mm AIO Liquid Cooler RGB",
                psu: "750W 80+ Gold Fully Modular",
                case: "IONIX Prism Mid-Tower (Glass)"
            },
            img: "/images/pc_setup/pc-build-2.png"
        },
        {
            id: "creator",
            name: "Creator Extreme",
            tag: "AI workflow & 4K editing power",
            price: "LKR 650,000+",
            themeColor: "from-purple-500 to-blue-600",
            glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.2)] border-purple-500/30",
            specs: {
                cpu: "AMD Ryzen 9 7900X",
                gpu: "NVIDIA RTX 4080 Super 16GB",
                ram: "64GB DDR5 6400MHz RGB",
                storage: "2TB Gen4 NVMe Dual SSD",
                cooler: "360mm AIO Liquid Cooler RGB",
                psu: "850W 80+ Gold PCIe 5.0",
                case: "IONIX Titan Full-Tower (Airflow)"
            },
            img: "/images/pc_setup/pc-build-3.png"
        }
    ];

    const [activePresetIdx, setActivePresetIdx] = useState(1);
    const activePreset = buildPresets[activePresetIdx];


    useEffect(() => {
        document.title = "IONIX Computers | No. 1 Smart Technology Partner in Sri Lanka";
        
        axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => {
                setProducts(response.data || []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load products for homepage:", err);
                setIsLoading(false);
            });
    }, []);

    // Split products for arrivals and best sellers
    const newArrivals = products.slice(0, 4);
    const bestSellers = products.slice(4, 12);

    const categories = [
        {
            title: "MONITORS",
            desc: "Experience ultra-high refresh rates & color accuracy.",
            img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
            link: "/products"
        },
        {
            title: "COOLERS",
            desc: "Keep thermals low with liquid & custom loops.",
            img: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=600",
            link: "/products"
        },
        {
            title: "LAPTOPS",
            desc: "High-performance portable gaming & workstation gear.",
            img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600",
            link: "/products"
        }
    ];

    const customRigs = [
        {
            img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400",
            name: "IONIX Chronos v1",
            specs: "Ryzen 7 7800X3D | RTX 4080 Super",
            tag: "Hyper-E-sports"
        },
        {
            img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400",
            name: "IONIX Nebula v2",
            specs: "Intel i9-14900K | RTX 4090 Liquid",
            tag: "Creator Extreme"
        },
        {
            img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400",
            name: "IONIX Apex v3",
            specs: "Ryzen 5 7600 | RTX 4070 Ti Super",
            tag: "Ray Tracing Pro"
        },
        {
            img: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=400",
            name: "IONIX Glacier v4",
            specs: "Intel i7-14700K | Dual Loop Custom",
            tag: "Liquid Showpiece"
        },
        {
            img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400",
            name: "IONIX Vanguard v5",
            specs: "Threadripper 7960X | Dual RTX 4090",
            tag: "Workstation AI"
        },
        {
            img: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=400",
            name: "IONIX Phantom v6",
            specs: "Ryzen 7 5700X3D | RX 7800 XT",
            tag: "Esports Edition"
        },
        {
            img: "https://images.unsplash.com/photo-1587202372666-5b694b38382c?q=80&w=400",
            name: "IONIX Eclipse v7",
            specs: "Intel i5-14400F | RTX 4060 Ti",
            tag: "Streamer Starter"
        },
        {
            img: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=400",
            name: "IONIX Titan v8",
            specs: "Ryzen 9 7950X3D | RTX 4090 AIO",
            tag: "Ultimate Gaming"
        }
    ];


    const reviews = [
        {
            name: "Ruwan Prasanna",
            date: "1 week ago",
            rating: 5,
            comment: "Excellent customer service and the neatest cable management I have ever seen! They guide you patiently to choose the exact components needed."
        },
        {
            name: "Sanduni Kaveesha",
            date: "3 days ago",
            rating: 5,
            comment: "Build was completed and stress-tested within 24 hours. The cooling setup runs silent under heavy loads. Highly recommended tech shop in Colombo!"
        },
        {
            name: "Mohamed Aslam",
            date: "2 weeks ago",
            rating: 5,
            comment: "100% genuine sealed boxes with authentic warranties. Prices are very competitive compared to other stores in Sri Lanka. Insured delivery was super fast."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 pb-20 select-none overflow-x-hidden">

            {/* Hero Video Banner Section */}
            <div className="w-full h-[650px] md:h-[850px] relative overflow-hidden flex items-center justify-center">
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
                    <source src="/slider-video.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-black/45 z-10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10" />

                <div className="absolute z-20 flex flex-col justify-center items-center text-center px-4 max-w-4xl">
                    <span className="text-accent-light text-xs font-bold uppercase tracking-widest mb-5 bg-accent/15 px-4 py-2 rounded-full border border-accent/20 shadow-[0_0_15px_rgba(59,130,246,0.25)] animate-pulse">
                        ⚡ No. 1 Smart Technology Partner in Sri Lanka
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                        Build Your <br className="md:hidden" />
                        <span className="relative">
                            <span className="bg-gradient-to-r from-accent-light via-blue-500 to-accent bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">Dream PC</span>
                            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[1px]"></span>
                        </span>
                    </h1>
                    <p className="text-sm md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
                        We specialize in providing state-of-the-art computer systems, premium gaming builds, high-performance components and accessories.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/products" className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-sm tracking-wide">
                            Shop Catalog
                        </Link>
                        <Link to="/contact-us" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-sm tracking-wide">
                            Get Quote
                        </Link>
                    </div>
                </div>

                {/* Animated Mouse Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1.5">
                        <div className="w-1.5 h-2.5 rounded-full bg-accent animate-[bounce_1.5s_infinite]"></div>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Scroll</span>
                </div>
            </div>

            {/* Build Your Own PC Section */}
            <div className="w-full bg-[#070b13] border-y border-white/5 py-24 px-6 relative overflow-hidden">
                {/* Ambient side glowing lights */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-[10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                    <div className="lg:col-span-6 flex flex-col">
                        <span className="text-xs font-bold text-accent-light uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            Custom Configurations
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Build Your <br />
                            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Own PC Masterpiece</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-8 text-base">
                            Tailor every component to your exact gaming, rendering, or editing specifications. Our technicians will professionally build, wire-manage, and stress-test your rig before shipping.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/products" className="px-7 py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_14px_rgba(59,130,246,0.3)] text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-sm">
                                <span>Build Now</span>
                                <FiChevronRight className="text-lg" />
                            </Link>
                            <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5 group">
                                <span>Consult a Specialist</span>
                                <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                            </Link>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-6 relative flex flex-col w-full">
                        {/* Interactive tabs */}
                        <div className="flex bg-white/5 border border-white/8 rounded-2xl p-1.5 mb-6 gap-1.5 self-center lg:self-start z-20">
                            {buildPresets.map((preset, idx) => (
                                <button
                                    key={preset.id}
                                    onClick={() => setActivePresetIdx(idx)}
                                    className={`px-4.5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                                        activePresetIdx === idx
                                            ? `bg-gradient-to-r ${preset.themeColor} text-white shadow-lg`
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>

                        {/* Gaming Preset Card */}
                        <div className={`relative w-full rounded-3xl bg-[#090d16] border border-white/5 backdrop-blur-md transition-all duration-500 overflow-hidden ${activePreset.glowColor}`}>
                            {/* Scanning line indicator */}
                            <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-light/40 to-transparent opacity-30 animate-scan pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center">
                                {/* Visual Image (Col 5) */}
                                <div className="md:col-span-5 relative flex justify-center">
                                    <div className="relative group w-full aspect-square max-w-[200px] md:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                        <img
                                            src={activePreset.img}
                                            alt={activePreset.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                                    </div>
                                </div>

                                {/* Spec Details (Col 7) */}
                                <div className="md:col-span-7 flex flex-col gap-4">
                                    <div>
                                        <span className="text-[9px] font-bold text-accent-light uppercase tracking-widest bg-accent/15 px-3 py-1 rounded-md border border-accent/20 shadow-glow-blue animate-pulse">
                                            {activePreset.tag}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight uppercase">{activePreset.name} Setup</h3>
                                    </div>

                                    {/* Specs details list */}
                                    <div className="flex flex-col gap-2 border-y border-white/5 py-3 text-xs leading-relaxed">
                                        <div className="flex justify-between items-center text-gray-400">
                                            <span className="font-medium text-gray-500">CPU</span>
                                            <span className="text-white truncate font-semibold max-w-[160px]" title={activePreset.specs.cpu}>{activePreset.specs.cpu}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-400">
                                            <span className="font-medium text-gray-500">GPU</span>
                                            <span className="text-white truncate font-semibold max-w-[160px]" title={activePreset.specs.gpu}>{activePreset.specs.gpu}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-400">
                                            <span className="font-medium text-gray-500">Cooler</span>
                                            <span className="text-white truncate font-semibold max-w-[160px]" title={activePreset.specs.cooler}>{activePreset.specs.cooler}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-400">
                                            <span className="font-medium text-gray-500">RAM/SSD</span>
                                            <span className="text-white truncate font-semibold max-w-[160px]" title={`${activePreset.specs.ram} | ${activePreset.specs.storage}`}>{activePreset.specs.ram}</span>
                                        </div>
                                    </div>

                                    {/* Price and customize action */}
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Est. Cost</span>
                                            <span className="text-base font-bold text-white font-mono">{activePreset.price}</span>
                                        </div>
                                        <Link
                                            to="/products"
                                            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-gradient-to-r ${activePreset.themeColor} hover:brightness-110 shadow-md hover:shadow-glow-blue transition-all duration-300 hover:scale-[1.03] cursor-pointer`}
                                        >
                                            Customize
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* IONIX Computers Stats Section */}
            <div className="relative w-full py-28 bg-[#02050b] overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
                
                {/* Background watermarked text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.01] text-[90px] md:text-[180px] font-black select-none z-0 tracking-widest uppercase text-center w-full">
                    IONIX SYSTEM
                </div>
                
                <div className="max-w-[1440px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 flex flex-col">
                        <span className="text-xs font-semibold text-accent-light uppercase tracking-widest mb-3">Our Legacy</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Pioneering Custom PC Hardware</h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            For nearly a decade, we have been delivering top-tier components, gaming set-ups, and workstations to enthusiasts across the island.
                        </p>
                    </div>
                    
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { value: "4+", label: "Years of Excellence", icon: <FiAward className="text-accent-light group-hover:text-accent transition-colors duration-300" /> },
                            { value: "100K+", label: "Components Supplied", icon: <FiCpu className="text-accent-light group-hover:text-accent transition-colors duration-300" /> },
                            { value: "3", label: "Showroom Branches", icon: <FiUsers className="text-accent-light group-hover:text-accent transition-colors duration-300" /> },
                            { value: "200+", label: "PC Builds Completed", icon: <FiTrendingUp className="text-accent-light group-hover:text-accent transition-colors duration-300" /> }
                        ].map((stat, idx) => (
                            <div key={idx} className="relative overflow-hidden group glass-card p-8 border border-white/5 hover:border-accent-light/30 hover:shadow-[0_12px_35px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[200px]">
                                {/* Laser scanner sweep effect line */}
                                <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-light/50 to-transparent opacity-0 group-hover:opacity-100 animate-scan pointer-events-none" />
                                
                                {/* High-tech corner neon borders */}
                                <div className="absolute top-0 right-0 w-8 h-[2px] bg-accent/20 group-hover:bg-accent-light transition-colors duration-300" />
                                <div className="absolute top-0 right-0 w-[2px] h-8 bg-accent/20 group-hover:bg-accent-light transition-colors duration-300" />
                                <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-accent/20 group-hover:bg-accent-light transition-colors duration-300" />
                                <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-accent/20 group-hover:bg-accent-light transition-colors duration-300" />
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xl">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 block group-hover:text-accent-light transition-colors duration-300">{stat.value}</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Arrivals */}
            <div className="max-w-[1440px] mx-auto px-6 py-24">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Fresh In Store</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">New Arrivals</h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                </div>
                
                {isLoading ? (
                    <div className="w-full py-12 flex justify-center"><div className="w-8 h-8 border-4 border-accent border-b-transparent rounded-full animate-spin"></div></div>
                ) : newArrivals.length === 0 ? (
                    <p className="text-center text-gray-500">No new products available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                        {newArrivals.map((item) => (
                            <ProductCard key={item.productId} product={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Best Sellers */}
            <div className="max-w-[1440px] mx-auto px-6 py-12 border-t border-white/5">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Top Rated Choices</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">Best Sellers</h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                </div>
                
                {isLoading ? (
                    <div className="w-full py-12 flex justify-center"><div className="w-8 h-8 border-4 border-accent border-b-transparent rounded-full animate-spin"></div></div>
                ) : bestSellers.length === 0 ? (
                    <p className="text-center text-gray-500">No bestselling products available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                        {bestSellers.map((item) => (
                            <ProductCard key={item.productId} product={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Pro Categories */}
            <div className="max-w-[1440px] mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Browse Collections</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">Pro Categories</h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <Link 
                            to={cat.link} 
                            key={idx}
                            className="group h-[360px] rounded-2xl overflow-hidden relative border border-white/5 flex flex-col justify-end p-8 hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300"
                        >
                            <img 
                                src={cat.img} 
                                alt={cat.title} 
                                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-500 z-0 opacity-30 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent z-10"></div>
                            
                            <div className="relative z-20 flex flex-col transform group-hover:translate-y-[-4px] transition-transform duration-300">
                                <span className="text-[10px] font-semibold text-accent-light uppercase tracking-widest mb-1.5 block">Explore</span>
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-accent-light transition-colors duration-300">{cat.title}</h3>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed font-light">{cat.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Designed by #IONIX Computers Grid */}
            <div className="max-w-[1440px] mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Custom Showcase</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">Designed by #IONIX</h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-4"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {customRigs.map((rig, idx) => (
                        <div key={idx} className="group aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/5 bg-white/[0.01] hover:border-accent-light/40 hover:shadow-glow-blue transition-all duration-300">
                            <img 
                                src={rig.img} 
                                alt={rig.name}
                                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <span className="text-[9px] text-accent-light font-semibold uppercase tracking-widest mb-1">{rig.tag}</span>
                                <h3 className="text-sm text-white font-bold uppercase tracking-wide">
                                    {rig.name}
                                </h3>
                                <span className="text-[10px] text-gray-400 mt-1.5 border-t border-white/10 pt-1.5 flex items-center gap-1.5">
                                    <FiCpu className="text-[11px] text-accent-light" />
                                    <span className="truncate">{rig.specs}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Commitment & Values Section */}
            <div className="w-full bg-[#070b13] border-y border-white/5 py-24 px-6 relative overflow-hidden">
                {/* Background lights */}
                <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Rotating Dashboard Dial Logo Container */}
                        <div className="relative w-56 h-56 flex items-center justify-center mb-8 lg:mb-0">
                            {/* Rotating dashed ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-light/25 animate-[spin_50s_linear_infinite]" />
                            {/* Outer glowing glow */}
                            <div className="absolute w-[80%] h-[80%] rounded-full bg-accent/5 blur-[20px] pointer-events-none" />
                            {/* Second rotating solid/dashed ring */}
                            <div className="absolute w-[85%] h-[85%] rounded-full border border-white/5 border-t-accent/40 animate-[spin_25s_linear_infinite_reverse]" />
                            {/* Glowing core badge */}
                            <div className="absolute w-[70%] h-[70%] rounded-full bg-[#050912]/80 border border-white/10 flex flex-col items-center justify-center p-4 shadow-[inset_0_2px_10px_rgba(59,130,246,0.15)]">
                                <img src="/favicon.png" alt="IONIX Computers" className="h-10 w-auto filter drop-shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:scale-110 transition-transform duration-300" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-light mt-2">Established</span>
                                <span className="text-[10px] font-bold text-white tracking-widest uppercase">SL NO.1</span>
                            </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-4 mt-6 uppercase tracking-tight">Our Core Commitment</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-sm">
                            We don't cut corners. Every part is genuine, every build is treated like a masterpiece with full official warranty backup.
                        </p>
                    </div>
                    
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <FiShield className="text-2xl text-accent-light" />,
                                title: "100% Genuine Seals",
                                desc: "No refurbished stock. Every component carries the full official brand warranty."
                            },
                            {
                                icon: <FiCpu className="text-2xl text-accent-light" />,
                                title: "Clean Cable Management",
                                desc: "Meticulous wiring setups for optimized internal airflow and aesthetic perfection."
                            },
                            {
                                icon: <FiAward className="text-2xl text-accent-light" />,
                                title: "Pro Stability Testing",
                                desc: "Every rig undergoes strict benchmark and stress testing before dispatch."
                            },
                            {
                                icon: <FiTruck className="text-2xl text-accent-light" />,
                                title: "Islandwide Secure Delivery",
                                desc: "Fully insured shipping ensures your computer arrives in flawless working condition."
                            }
                        ].map((val, idx) => (
                            <div key={idx} className="group flex gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-accent/20 hover:bg-white/[0.02] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all duration-300">
                                <div className="p-3 bg-white/5 border border-white/5 group-hover:border-accent/30 group-hover:bg-accent/10 rounded-xl h-fit shrink-0 text-accent-light transition-all duration-300">
                                    {val.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-semibold mb-1.5 group-hover:text-accent-light transition-colors duration-200">{val.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Google Customer Reviews Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-28 relative">
                {/* Background ambient light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="flex flex-col items-center text-center mb-20 relative z-10">
                    <span className="text-xs font-semibold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Client Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">Google Reviews</h2>
                    <div className="flex items-center gap-1.5 mt-4 text-yellow-500 text-sm bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full shadow-md">
                        <FiStar className="fill-current text-yellow-400" />
                        <FiStar className="fill-current text-yellow-400" />
                        <FiStar className="fill-current text-yellow-400" />
                        <FiStar className="fill-current text-yellow-400" />
                        <FiStar className="fill-current text-yellow-400" />
                        <span className="text-white text-xs font-medium ml-1.5">4.9 / 5.0 (520+ Reviews)</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="glass-card p-8 border border-white/5 shadow-lg flex flex-col justify-between hover:border-accent/20 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] transition-all duration-300">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white text-sm">{rev.name}</span>
                                        <span className="text-xs text-gray-500 mt-1">{rev.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-xs">
                                        {Array.from({ length: rev.rating }).map((_, i) => (
                                            <FiStar key={i} className="fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed italic font-light">"{rev.comment}"</p>
                            </div>
                            <div className="border-t border-white/5 mt-8 pt-4 flex items-center justify-between text-[11px] text-gray-500">
                                <span className="uppercase tracking-widest font-semibold">Verified Customer</span>
                                <span className="font-semibold text-accent-light uppercase tracking-wider">Google Maps</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}