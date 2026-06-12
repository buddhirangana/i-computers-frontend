import { useState, useRef, useEffect } from "react";
import { BiSearch, BiCart, BiMenu, BiX } from "react-icons/bi";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserData from "./userData";
import api from "../utils/api";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchVal.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
            setSearchVal("");
            setIsSearchOpen(false);
        }
    };

    // Load user details for mobile menu drawer
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log("Error loading user info in header:", error);
                localStorage.removeItem("token");
                setUser(null);
            });
        } else {
            setUser(null);
        }
    }, [isMobileMenuOpen]);

    // Handle logout in mobile menu drawer
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsMobileMenuOpen(false);
        navigate("/login");
    };

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const navLinkClass = ({ isActive }) => 
        `relative text-sm font-semibold transition-all duration-300 py-1.5 ${
            isActive 
                ? "text-accent-light drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]" 
                : "text-gray-300 hover:text-white"
        }`;

    const mobileNavLinkClass = ({ isActive }) => 
        `text-sm font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 block ${
            isActive 
                ? "bg-accent/10 text-accent-light border-l-4 border-accent" 
                : "text-gray-300 hover:text-white hover:bg-white/5"
        }`;

    return (
        <header className="w-full h-[80px] bg-gradient-to-r from-secondary to-[#0b0f19] border-b border-white/5 sticky top-0 z-50 flex items-center justify-center shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            
            {/* Mobile View: Hamburger Menu Trigger (Left) */}
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="absolute left-4 lg:hidden text-white text-3xl hover:text-accent cursor-pointer transition-colors duration-200 p-1 flex items-center justify-center focus:outline-none"
                aria-label="Open navigation menu"
            >
                <BiMenu />
            </button>

            {/* Logo Link with Hover Scale (Centered on Mobile, Left-aligned on Desktop) */}
            <Link to="/" className="h-full absolute lg:w-[200px] lg:left-10 flex justify-center items-center">
                <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="h-14 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-transform duration-300 hover:scale-105"
                />
            </Link>
            
            {/* Desktop View: Center Navigation Links with Active Dot Indicators */}
            <div className="h-full hidden lg:flex justify-center items-center gap-10">
                <NavLink to="/" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            Home
                            {isActive && (
                                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-glow-blue animate-pulse" />
                            )}
                        </>
                    )}
                </NavLink>
                <NavLink to="/products" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            Products
                            {isActive && (
                                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-glow-blue animate-pulse" />
                            )}
                        </>
                    )}
                </NavLink>
                <NavLink to="/about-us" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            About Us
                            {isActive && (
                                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-glow-blue animate-pulse" />
                            )}
                        </>
                    )}
                </NavLink>
                <NavLink to="/contact-us" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            Contact Us
                            {isActive && (
                                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-glow-blue animate-pulse" />
                            )}
                        </>
                    )}
                </NavLink>
            </div>

            {/* Desktop View: Right Action Icons Group */}
            <div className="absolute right-10 hidden lg:flex items-center gap-6">
                {/* Search Bar / Icon */}
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onBlur={() => {
                            if (!searchVal) setIsSearchOpen(false);
                        }}
                        className={`absolute right-full mr-3 transition-all duration-300 ease-in-out bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                            isSearchOpen ? "w-[180px] opacity-100 visible" : "w-0 opacity-0 invisible pointer-events-none"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (isSearchOpen && searchVal.trim()) {
                                handleSearchSubmit({ preventDefault: () => {} });
                            } else {
                                setIsSearchOpen(!isSearchOpen);
                            }
                        }}
                        className="text-white hover:text-accent text-2xl transition-all duration-200 hover:scale-115 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center p-1.5"
                        aria-label="Toggle search input"
                    >
                        <BiSearch />
                    </button>
                </form>

                {/* User Data / Dropdown */}
                <div className="h-[50px] flex justify-center items-center transition-all duration-200 hover:scale-110">
                    <UserData />
                </div>

                {/* Cart Link */}
                <Link 
                    to="/cart" 
                    className="text-white hover:text-accent text-3xl transition-all duration-200 hover:scale-115 hover:-translate-y-0.5 flex items-center justify-center p-1"
                    aria-label="Shopping cart"
                >
                    <BiCart />
                </Link>
            </div>

            {/* Mobile View: Search & Cart Action Group (Right) */}
            <div className="absolute right-4 lg:hidden flex items-center gap-3">
                <Link 
                    to="/products"
                    className="text-white hover:text-accent text-2xl transition-all duration-200 p-1.5 flex items-center justify-center focus:outline-none"
                    aria-label="Search products catalog"
                >
                    <BiSearch />
                </Link>
                <Link 
                    to="/cart"
                    className="text-white hover:text-accent text-2xl transition-all duration-200 p-1.5 flex items-center justify-center focus:outline-none"
                    aria-label="Shopping cart page"
                >
                    <BiCart />
                </Link>
            </div>

            {/* Mobile View: Slide-over Navigation Drawer Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-45 lg:hidden animate-fade-in"
                />
            )}

            {/* Mobile View: Slide-over Navigation Drawer Menu */}
            <div className={`fixed top-0 left-0 w-[280px] h-full bg-[#0b0f19] border-r border-white/5 shadow-2xl p-6 z-50 flex flex-col gap-6 lg:hidden transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                {/* Drawer Header: Close button + branding */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <img 
                        src="/logo.png" 
                        alt="IONIX logo" 
                        className="h-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
                    />
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-400 hover:text-white text-3xl cursor-pointer focus:outline-none flex items-center justify-center p-1 hover:scale-110 transition-transform"
                        aria-label="Close menu"
                    >
                        <BiX />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 mt-2">
                    <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Products</NavLink>
                    <NavLink to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>About Us</NavLink>
                    <NavLink to="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Contact Us</NavLink>
                </nav>

                {/* Divider */}
                <div className="border-t border-white/5 my-1" />

                {/* Auth Links / Account Info */}
                <div className="flex flex-col gap-3">
                    {user ? (
                        <>
                            <div className="flex flex-col gap-1 border-b border-white/5 pb-4 px-2">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Signed in as</span>
                                <span className="text-sm font-extrabold text-white truncate">{user.firstName} {user.lastName}</span>
                                <span className="text-xs text-gray-400 truncate">{user.email}</span>
                            </div>
                            <Link 
                                to="/settings" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-sm font-semibold text-gray-300 hover:text-accent py-2 px-2 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Settings
                            </Link>
                            <Link 
                                to="/my-orders" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-sm font-semibold text-gray-300 hover:text-accent py-2 px-2 rounded-lg hover:bg-white/5 transition-all"
                            >
                                My Orders
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="text-sm font-semibold text-red-500 hover:text-red-400 text-left transition-colors cursor-pointer py-2 px-2 mt-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <Link 
                                to="/login" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-sm font-semibold text-gray-300 hover:text-accent py-2 px-3 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="text-sm font-semibold text-gray-300 hover:text-accent py-2 px-3 rounded-lg hover:bg-white/5 transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}