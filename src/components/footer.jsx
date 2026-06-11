import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaXTwitter, FaTwitch, FaFacebookF, FaDiscord, FaReddit, FaTiktok } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#030712] text-gray-400 shrink-0 font-sans overflow-hidden border-t border-white/5">
            {/* High-tech top border glow effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-pulse" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent blur-[2px]" />
            
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[250px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[200px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Tech Grid Pattern Mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 py-20 z-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
                    {/* Column 1: Branding & Description */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-6 pr-0 md:pr-10">
                        <Link to="/" className="flex items-center gap-2 w-fit group">
                            <div className="relative">
                                <img 
                                    src="/logo.png" 
                                    alt="IONIX Logo" 
                                    className="h-16 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-sm mt-1">
                            IONIX Computers is Sri Lanka's leading smart technology partner. We specialize in providing state-of-the-art computer systems, premium gaming builds, high-performance components and accessories.
                        </p>
                        
                        {/* Social Media Link Buttons with lift-up squircle cards */}
                        <div className="flex flex-wrap gap-3 mt-2">
                            {[
                                { href: "#", icon: <FaInstagram className="text-[18px]" />, label: "Instagram" },
                                { href: "#", icon: <FaYoutube className="text-[18px]" />, label: "Youtube" },
                                { href: "#", icon: <FaXTwitter className="text-[18px]" />, label: "Twitter" },
                                { href: "#", icon: <FaTwitch className="text-[18px]" />, label: "Twitch" },
                                { href: "#", icon: <FaFacebookF className="text-[18px]" />, label: "Facebook" },
                                { href: "#", icon: <FaDiscord className="text-[18px]" />, label: "Discord" },
                                { href: "#", icon: <FaTiktok className="text-[18px]" />, label: "Tiktok" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href} 
                                    aria-label={social.label} 
                                    className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/8 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-light flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.15)]"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Company
                            </h3>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
                        </div>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/products", label: "Products" },
                                { to: "/about-us", label: "About Us" },
                                { to: "/contact-us", label: "Contact Us" },
                                { href: "#", label: "Blog" },
                                { href: "#", label: "Team" }
                            ].map((item, index) => (
                                <li key={index} className="group flex items-center">
                                    <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 h-[2px] bg-accent mr-0 group-hover:mr-2.5 transition-all duration-300 rounded-full" />
                                    {item.to ? (
                                        <Link 
                                            to={item.to} 
                                            className="hover:text-accent-light transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a 
                                            href={item.href} 
                                            className="hover:text-accent-light transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Brands */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Brands
                            </h3>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
                        </div>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {[
                                { href: "#", label: "Asus" },
                                { href: "#", label: "MSI" },
                                { href: "#", label: "Corsair" },
                                { href: "#", label: "Keychron" },
                                { href: "#", label: "Thermaltake" },
                                { href: "#", label: "Arctic" }
                            ].map((item, index) => (
                                <li key={index} className="group flex items-center">
                                    <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 h-[2px] bg-accent mr-0 group-hover:mr-2.5 transition-all duration-300 rounded-full" />
                                    <a 
                                        href={item.href} 
                                        className="hover:text-accent-light transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Support */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Support
                            </h3>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
                        </div>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {[
                                { to: "/cart", label: "Shopping Cart" },
                                { to: "/my-orders", label: "Track My Orders" },
                                { to: "/settings", label: "Profile Settings" },
                                { href: "#", label: "FAQ" },
                                { href: "#", label: "Warranty" },
                                { href: "#", label: "Returns & Refunds" }
                            ].map((item, index) => (
                                <li key={index} className="group flex items-center">
                                    <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 h-[2px] bg-accent mr-0 group-hover:mr-2.5 transition-all duration-300 rounded-full" />
                                    {item.to ? (
                                        <Link 
                                            to={item.to} 
                                            className="hover:text-accent-light transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a 
                                            href={item.href} 
                                            className="hover:text-accent-light transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom copyright banner */}
            <div className="relative w-full bg-[#02040a] border-t border-white/5 py-8 px-6 pb-[100px] md:pb-8 lg:pb-8 shadow-inner z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs text-gray-500 font-medium">
                    <span>
                        Copyright &copy; {currentYear}, <span className="text-gray-300 font-semibold transition-colors duration-200 hover:text-white">IONIX Computers</span>. All Rights Reserved. Developed by <a href="https://buddhirangana.com" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent hover:underline transition-colors duration-200">Buddhi Rangana.</a>
                    </span>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors duration-200 relative group py-1">
                            Privacy Policy
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="hover:text-white cursor-pointer transition-colors duration-200 relative group py-1">
                            Terms of Use
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
