import { useState, useRef, useEffect } from "react";
import { BiSearch, BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
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

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="w-full h-[100px] glass-nav sticky top-0 z-50 flex items-center justify-center shrink-0 shadow-lg">
            <Link to="/" className="lg:w-[200px] h-full absolute lg:left-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className="h-[60px] mr-2 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"/>
            </Link>
            
            <div className="h-full hidden lg:flex justify-center items-center gap-10">
                <Link to="/" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Products</Link>
                <Link to="/about-us" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">About Us</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Contact Us</Link>
            </div>

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
                        className="text-white hover:text-accent text-2xl transition-colors duration-200 cursor-pointer flex items-center justify-center p-1.5"
                        aria-label="Toggle search input"
                    >
                        <BiSearch />
                    </button>
                </form>

                {/* User Data / Dropdown */}
                <div className="h-[50px] flex justify-center items-center">
                    <UserData />
                </div>

                {/* Cart Link */}
                <Link 
                    to="/cart" 
                    className="text-white hover:text-accent text-3xl transition-colors duration-200 flex items-center justify-center p-1"
                    aria-label="Shopping cart"
                >
                    <BiCart />
                </Link>
            </div>
        </header>
    );
}