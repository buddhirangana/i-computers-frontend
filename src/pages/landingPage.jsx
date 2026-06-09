import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiCpu, FiAward, FiUsers, FiTrendingUp, FiShield, FiCheckCircle, FiTruck, FiStar, FiChevronRight } from "react-icons/fi";
import ProductCard from "../components/productCard";

export default function LandingPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "iComputers | Premium Custom PC Builds & Tech Store in Sri Lanka";
        
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

    const rigs = [
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400",
        "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400",
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400",
        "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=400",
        "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400",
        "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=400",
        "https://images.unsplash.com/photo-1587202372666-5b694b38382c?q=80&w=400",
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=400"
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
            
            {/* 1. Hero Video Banner Section */}
            <div className="w-full h-[650px] relative overflow-hidden flex items-center justify-center">
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-black/30 z-10"></div>
                
                <div className="absolute z-20 flex flex-col justify-center items-center text-center px-4 max-w-4xl">
                    <span className="text-accent-light text-xs font-extrabold uppercase tracking-widest mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20 shadow-glow-blue animate-pulse">
                        Premium Custom PC Builders
                    </span>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-none">
                        Unleash Your <span className="bg-gradient-to-r from-accent-light via-blue-500 to-accent bg-clip-text text-transparent">Power</span>
                    </h1>
                    <p className="text-sm md:text-xl text-gray-300 mb-8 max-w-xl font-light leading-relaxed">
                        Precision engineering, premium cable management, and high-performance gaming rigs tailored to your imagination.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/products" className="px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg hover:shadow-glow-blue transition-all duration-200 cursor-pointer text-sm tracking-wide">
                            Shop Catalog
                        </Link>
                        <Link to="/contact-us" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all duration-200 cursor-pointer text-sm tracking-wide">
                            Get Quote
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. Build Your Own PC Section */}
            <div className="w-full bg-secondary/30 border-y border-white/5 py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2">Custom Configurations</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Build Your <br />
                            <span className="bg-gradient-to-r from-red-500 to-accent bg-clip-text text-transparent">Own PC</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Tailor every component to your exact gaming, rendering, or editing specifications. Our technicians will professionally build, wire-manage, and stress-test your rig before shipping.
                        </p>
                        <div className="flex items-center gap-6 mt-4">
                            <Link to="/products" className="px-6 py-3 bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm">
                                <span>Build Now</span>
                                <FiChevronRight />
                            </Link>
                            <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">
                                Consult a Specialist
                            </Link>
                        </div>
                    </div>
                    
                    <div className="relative flex justify-center items-center">
                        {/* Glow backdrops */}
                        <div className="absolute w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[80px] -left-10"></div>
                        <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -right-10"></div>
                        
                        <img 
                            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600" 
                            alt="Custom PC Build"
                            className="w-full max-w-[450px] rounded-3xl border border-white/10 shadow-2xl relative z-10 transform hover:-translate-y-2 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* 3. iComputers Stats Section */}
            <div className="w-full py-24 bg-black/40 relative overflow-hidden">
                {/* Large background watermarked text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.01] text-[120px] md:text-[200px] font-black select-none z-0 tracking-widest">
                    iCOMPUTERS
                </div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    <div className="lg:col-span-2">
                        <span className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2">Our Legacy</span>
                        <h2 className="text-3xl font-black text-white mb-6">Pioneering Custom Hardware</h2>
                        <p className="text-gray-400 leading-relaxed">
                            For nearly a decade, we have been delivering top-tier components, gaming set-ups, and workstations to enthusiasts across the island.
                        </p>
                    </div>
                    
                    <div className="lg:col-span-3 grid grid-cols-2 gap-6">
                        {[
                            { value: "9+", label: "Years of Excellence" },
                            { value: "400K+", label: "Components Supplied" },
                            { value: "3", label: "Showroom Branches" },
                            { value: "100K+", label: "PC Builds Completed" }
                        ].map((stat, idx) => (
                            <div key={idx} className="glass-card p-6 border border-white/5 shadow-md flex flex-col justify-center hover:border-accent/30 transition-colors duration-200">
                                <span className="text-3xl md:text-5xl font-black text-accent-light mb-2">{stat.value}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. New Arrivals */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Fresh In Store</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">New Arrivals</h2>
                    <div className="w-12 h-1 bg-accent rounded-full mt-4"></div>
                </div>
                
                {isLoading ? (
                    <div className="w-full py-12 flex justify-center"><div className="w-8 h-8 border-4 border-accent border-b-transparent rounded-full animate-spin"></div></div>
                ) : newArrivals.length === 0 ? (
                    <p className="text-center text-gray-500">No new products available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                        {newArrivals.map((item) => (
                            <ProductCard key={item.productId} product={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* 5. Best Sellers */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Top Rated Choices</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Best Sellers</h2>
                    <div className="w-12 h-1 bg-accent rounded-full mt-4"></div>
                </div>
                
                {isLoading ? (
                    <div className="w-full py-12 flex justify-center"><div className="w-8 h-8 border-4 border-accent border-b-transparent rounded-full animate-spin"></div></div>
                ) : bestSellers.length === 0 ? (
                    <p className="text-center text-gray-500">No bestselling products available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                        {bestSellers.map((item) => (
                            <ProductCard key={item.productId} product={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* 6. Pro Categories */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Browse Collections</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Pro Categories</h2>
                    <div className="w-12 h-1 bg-accent rounded-full mt-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <Link 
                            to={cat.link} 
                            key={idx}
                            className="group h-[320px] rounded-2xl overflow-hidden relative border border-white/5 flex flex-col justify-end p-6 hover:border-accent/30 transition-all duration-300 shadow-lg"
                        >
                            <img 
                                src={cat.img} 
                                alt={cat.title} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0 opacity-40 group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent z-10"></div>
                            
                            <div className="relative z-20 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{cat.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 7. Designed by #iCOMPUTERS Grid */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Custom Showcase</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Designed by #iCOMPUTERS</h2>
                    <div className="w-12 h-1 bg-accent rounded-full mt-4"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {rigs.map((src, idx) => (
                        <div key={idx} className="group aspect-square rounded-xl overflow-hidden relative border border-white/5">
                            <img 
                                src={src} 
                                alt={`Custom Rig ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full border border-white/10 font-bold uppercase tracking-wider">
                                    View Specs
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 8. Brand Badge & Values Section */}
            <div className="w-full bg-secondary/35 border-y border-white/5 py-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Cool circular badge layout */}
                        <div className="w-48 h-48 rounded-full border-4 border-dashed border-accent-light/30 flex items-center justify-center p-3 animate-[spin_40s_linear_infinite] mb-6">
                            <div className="w-full h-full rounded-full bg-accent/10 border border-accent/20 flex flex-col items-center justify-center p-4">
                                <span className="text-white font-extrabold text-xl tracking-wider">iCOMPUTERS</span>
                                <span className="text-xs text-accent-light font-bold mt-1 uppercase tracking-widest">Est. 2017</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Our Commitment</h3>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            We don't cut corners. Every part is genuine, every build is treated like a masterpiece.
                        </p>
                    </div>
                    
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            <div key={idx} className="flex gap-4">
                                <div className="p-3 bg-white/5 border border-white/5 rounded-xl h-fit shrink-0 text-accent-light">
                                    {val.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold mb-1.5">{val.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 9. Google Customer Reviews Section */}
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Client Testimonials</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Google Reviews</h2>
                    <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <span className="text-white text-xs font-bold ml-1.5">4.9 / 5.0 (520+ Reviews)</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="glass-card p-6 border border-white/5 shadow-md flex flex-col justify-between hover:border-accent/20 transition-all duration-200">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">{rev.name}</span>
                                        <span className="text-xs text-gray-500 mt-0.5">{rev.date}</span>
                                    </div>
                                    <div className="flex text-yellow-500 text-xs">
                                        {Array.from({ length: rev.rating }).map((_, i) => (
                                            <FiStar key={i} className="fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed italic">"{rev.comment}"</p>
                            </div>
                            <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between text-xs text-gray-500">
                                <span>Verified Customer</span>
                                <span className="font-semibold text-accent-light">Google</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}