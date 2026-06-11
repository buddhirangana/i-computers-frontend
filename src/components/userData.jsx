import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiSolidUser } from "react-icons/bi";

export default function UserData({ className }) {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api
                .get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    // Clear invalid or expired token
                    localStorage.removeItem("token");
                });
        }
    }, []);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <div className="relative flex items-center justify-center h-full" ref={dropdownRef}>
            {user ? (
                // Logged In Trigger
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={className || "flex items-center focus:outline-none cursor-pointer h-full aspect-square justify-center"}
                    aria-label="User profile menu"
                >
                    {user.image && !imageError ? (
                        <img
                            src={user.image}
                            referrerPolicy="no-referrer"
                            alt="Profile"
                            className="w-9 h-9 rounded-full object-cover border border-white/20 hover:border-accent transition-colors duration-200"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xl hover:bg-accent/30 hover:border-accent transition-colors duration-200">
                            <BiSolidUser />
                        </div>
                    )}
                </button>
            ) : (
                // Logged Out Trigger
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={className || "text-white hover:text-accent text-2xl transition-colors duration-200 focus:outline-none cursor-pointer flex items-center justify-center h-full aspect-square"}
                    aria-label="User login/signup menu"
                >
                    <BiUser />
                </button>
            )}

            {/* Custom Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-56 rounded-xl bg-gradient-to-b from-white/95 to-white backdrop-blur-md border border-white/20 shadow-2xl p-2 z-50 origin-bottom-right bottom-full mb-3 lg:top-full lg:bottom-auto lg:mt-3 lg:mb-0 lg:origin-top-right">
                    {user ? (
                        // Logged In Options
                        <>
                            <div className="px-4 py-2.5 border-b border-slate-100">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Signed in as</p>
                                <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <div className="py-1">
                                <Link
                                    to="/settings"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-accent font-semibold rounded-lg transition-colors duration-150"
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/my-orders"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-accent font-semibold rounded-lg transition-colors duration-150"
                                >
                                    My Orders
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 pt-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold rounded-lg text-left transition-colors duration-150 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        // Logged Out Options
                        <div className="py-1">
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-accent font-bold rounded-lg transition-colors duration-150"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-accent font-bold rounded-lg transition-colors duration-150"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}