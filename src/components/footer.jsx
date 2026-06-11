import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaXTwitter, FaTwitch, FaFacebookF, FaDiscord, FaReddit, FaTiktok } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="w-full bg-black text-gray-400 border-t border-gray-900 shrink-0 font-sans">
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                {/* Column 1: Company */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase">Company</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-white transition-colors duration-200">Products</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="hover:text-white transition-colors duration-200">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="hover:text-white transition-colors duration-200">Contact Us</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Blog</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Invest With Us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Team</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Wholesale</a>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Brands */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase">Brands</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Arctic</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Thermaltake</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Addlink</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Keychron</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Asus</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">MSI</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Corsair</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">MarsRhino</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Support */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase">Support</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <Link to="/cart" className="hover:text-white transition-colors duration-200">Shopping Cart</Link>
                        </li>
                        <li>
                            <Link to="/my-orders" className="hover:text-white transition-colors duration-200">Track My Orders</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-white transition-colors duration-200">Profile Settings</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-white transition-colors duration-200">Sign In / Register</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">FAQ</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Shipping</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Returns & Refunds</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200">Warranty</a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Contact */}
                <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase">Contact</h3>
                    <div className="grid grid-cols-4 gap-y-5 gap-x-2 w-fit text-gray-400">
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaInstagram className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaYoutube className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaXTwitter className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaTwitch className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaFacebookF className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaDiscord className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaReddit className="text-[24px]" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-200">
                            <FaTiktok className="text-[24px]" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom copyright banner */}
            <div className="w-full bg-[#050505] border-t border-gray-900 py-6 px-6 pb-[100px] lg:pb-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-gray-500">
                    <span>
                        Copyright &copy; {currentYear}, IONIX Computers. All Right Reserved. Developed by <a href="http://buddhirangana.com" target="_blank">Buddhi Rangana.</a>
                    </span>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-gray-400 cursor-pointer transition-colors duration-200">Privacy Policy</span>
                        <span className="hover:text-gray-400 cursor-pointer transition-colors duration-200">Terms of Use</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
