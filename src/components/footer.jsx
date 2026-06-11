import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaXTwitter, FaTwitch, FaFacebookF, FaDiscord, FaReddit, FaTiktok } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0b0f19] to-[#030712] text-gray-400 border-t border-white/5 shrink-0 font-sans shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Column 1: Branding & Description */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-5 pr-0 md:pr-8">
                    <Link to="/" className="flex items-center gap-2 w-fit">
                        <img 
                            src="/logo.png" 
                            alt="IONIX Logo" 
                            className="h-12 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-transform duration-300 hover:scale-105" 
                        />
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-sm mt-2">
                        IONIX Computers is Sri Lanka's leading smart technology partner. We specialize in providing state-of-the-art computer systems, premium gaming builds, high-performance components, and accessories.
                    </p>
                    
                    {/* Social Media Link Buttons */}
                    <div className="flex flex-wrap gap-2.5 mt-3">
                        <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaInstagram className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaYoutube className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaXTwitter className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Twitch" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaTwitch className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaFacebookF className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Discord" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaDiscord className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Reddit" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaReddit className="text-[16px]" />
                        </a>
                        <a href="#" aria-label="Tiktok" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 hover:bg-accent/20 hover:text-accent-light hover:border-accent/40 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-md">
                            <FaTiktok className="text-[16px]" />
                        </a>
                    </div>
                </div>

                {/* Column 2: Company */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-extrabold text-xs tracking-wider uppercase border-b border-white/5 pb-2">Company</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Products</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Contact Us</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Blog</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Team</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Brands */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-extrabold text-xs tracking-wider uppercase border-b border-white/5 pb-2">Brands</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Asus</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">MSI</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Corsair</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Keychron</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Thermaltake</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Arctic</a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Support */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-extrabold text-xs tracking-wider uppercase border-b border-white/5 pb-2">Support</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <Link to="/cart" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Shopping Cart</Link>
                        </li>
                        <li>
                            <Link to="/my-orders" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Track My Orders</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Profile Settings</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">FAQ</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Warranty</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">Returns & Refunds</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom copyright banner */}
            <div className="w-full bg-[#02040a] border-t border-white/5 py-6 px-6 pb-[100px] lg:pb-6 shadow-inner">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-gray-500 font-medium">
                    <span>
                        Copyright &copy; {currentYear}, <span className="text-gray-400 font-semibold">IONIX Computers</span>. All Rights Reserved. Developed by <a href="http://buddhirangana.com" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">Buddhi Rangana.</a>
                    </span>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Privacy Policy</span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Terms of Use</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
