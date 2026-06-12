import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FiShoppingBag, FiBox, FiUsers, FiMessageSquare } from "react-icons/fi";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminProductsPage from "./admin/adminProductPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import api from "../utils/api";
import LoadingAnimation from "../components/loadingAnimation";

export default function AdminPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdminVerified, setIsAdminVerified] = useState(false);

    useEffect(() => {
        document.title = "Admin Dashboard | IONIX Computers";

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.data && response.data.isAdmin) {
                setIsAdminVerified(true);
            } else {
                navigate("/login");
            }
        }).catch(error => {
            console.error("Admin verification failed:", error);
            navigate("/login");
        });
    }, [navigate]);

    if (!isAdminVerified) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-primary">
                <LoadingAnimation />
            </div>
        );
    }

    const activeRoute = location.pathname;
    
    const navItems = [
        { path: "/admin", label: "Orders", icon: <FiShoppingBag /> },
        { path: "/admin/products", label: "Products", icon: <FiBox /> },
        { path: "/admin/users", label: "Users", icon: <FiUsers /> },
        { path: "/admin/reviews", label: "Reviews", icon: <FiMessageSquare /> },
    ];

    return (
        <div className="w-full h-screen flex items-center bg-primary text-white font-sans">
            {/* Sidebar */}
            <div className="w-[260px] h-full bg-secondary border-r border-white/5 flex flex-col justify-between py-8 px-4 shrink-0">
                <div className="flex flex-col gap-6">
                    <div className="px-4 mb-2 flex flex-col items-center">
                        <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"/>
                        <span className="block text-xs text-accent font-semibold uppercase tracking-widest mt-2">Admin Panel</span>
                    </div>

                    {/* Admin Status Profile Box */}
                    <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs shadow-inner">
                            AD
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs text-white font-medium truncate">Administrator</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[9px] text-green-400 font-base tracking-wider">System Online</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = activeRoute === item.path || 
                                (item.path === "/admin" && activeRoute === "/admin/");
                            
                            return (
                                <Link 
                                    key={item.path} 
                                    to={item.path} 
                                    className={`flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        isActive 
                                            ? "bg-accent/10 text-white border-l-4 border-accent shadow-inner" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                                    }`}
                                >
                                    <span className={`text-lg ${isActive ? "text-accent-light" : "text-gray-400"}`}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="px-2 flex flex-col gap-2">
                    <Link to="/" target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium border border-white/5 hover:border-white/10 transition-all duration-200">
                        View Store
                    </Link>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }} className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-medium border border-red-500/10 hover:border-red-500/20 transition-all duration-200">
                        <FaSignOutAlt className="text-lg" />
                        Logout
                    </button>
                </div>
            </div>
            {/* Content Area */}
            <div className="w-[calc(100%-260px)] h-full bg-white p-4">
                <div className="w-full h-full bg-white border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <Routes>
                        <Route path="/" element={<AdminOrdersPage />} />
                        <Route path="/products" element={<AdminProductsPage />} />
                        <Route path="/add-product" element={<AdminAddProductPage />} />
                        <Route path="/edit-product" element={<AdminEditProductPage />} />
                        <Route path="/users" element={<AdminUsersPage />} />
                        <Route path="/reviews" element={<AdminReviewsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}