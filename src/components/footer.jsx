import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-secondary text-gray-300 border-t border-gray-750 shrink-0">
            {/* Top section: grid footer */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* Column 1: Brand Info */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2 w-fit">
                        <img src="/logo.png" alt="Logo" className="h-[48px] object-contain" />
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Sri Lanka's premium tech landmark. We assemble high-performance custom gaming PCs, configure workspaces, and deliver authentic computer hardware nationwide.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200">
                            <FaFacebookF className="text-sm" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200">
                            <FaTwitter className="text-sm" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200">
                            <FaInstagram className="text-sm" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200">
                            <FaYoutube className="text-sm" />
                        </a>
                    </div>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-base tracking-wider uppercase">Quick Links</h3>
                    <ul className="flex flex-col gap-2.5 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white hover:underline transition-all duration-200">Home Landing</Link>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-white hover:underline transition-all duration-200">Products Catalog</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="hover:text-white hover:underline transition-all duration-200">About Our Company</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="hover:text-white hover:underline transition-all duration-200">Contact Support</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Customer Care */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-base tracking-wider uppercase">Customer Support</h3>
                    <ul className="flex flex-col gap-2.5 text-sm">
                        <li>
                            <Link to="/cart" className="hover:text-white hover:underline transition-all duration-200">Shopping Cart</Link>
                        </li>
                        <li>
                            <Link to="/my-orders" className="hover:text-white hover:underline transition-all duration-200">Track My Orders</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-white hover:underline transition-all duration-200">Profile Settings</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-white hover:underline transition-all duration-200">Sign In / Register</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Store Info */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-base tracking-wider uppercase">Store Details</h3>
                    <ul className="flex flex-col gap-3.5 text-sm">
                        <li className="flex gap-3 items-start">
                            <FiMapPin className="text-accent text-lg shrink-0 mt-0.5" />
                            <span className="text-gray-400 leading-normal">
                                123 Tech Avenue, Galle Road, Colombo 03, Sri Lanka
                            </span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <FiPhone className="text-accent text-lg shrink-0" />
                            <span className="text-gray-400">+94 11 234 5678</span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <FiMail className="text-accent text-lg shrink-0" />
                            <span className="text-gray-400 font-medium">support@icomputers.lk</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom section: copyright banner with padding adjustment for mobile floating bottom bar */}
            <div className="w-full bg-gray-950/40 border-t border-gray-800 py-6 px-6 pb-[100px] lg:pb-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-gray-500">
                    <span>
                        &copy; {currentYear} iComputers. All rights reserved. Design & Develop by <a href="https://buddhirangana.com" target="_blank" rel="noreferrer">Buddhi Rangana</a>.
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
