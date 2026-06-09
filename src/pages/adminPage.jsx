import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
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
    const [isAdminVerified, setIsAdminVerified] = useState(false);

    useEffect(() => {
        document.title = "Admin Dashboard | iComputers";

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

    return (
        <div className="w-full h-screen flex items-center bg-primary text-white font-sans">
            {/* Sidebar */}
            <div className="w-[260px] h-full bg-secondary border-r border-white/5 flex flex-col justify-between py-8 px-4 shrink-0">
                <div className="flex flex-col gap-6">
                    <div className="px-4 mb-4 flex flex-col items-start">
                        <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"/>
                        <span className="block text-xs text-accent font-semibold uppercase tracking-widest mt-2">Admin Panel</span>
                    </div>
                    <nav className="flex flex-col gap-1.5">
                        <Link to="/admin/" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Orders</Link>
                        <Link to="/admin/products" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Products</Link>
                        <Link to="/admin/users" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Users</Link>
                        <Link to="/admin/reviews" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Reviews</Link>
                    </nav>
                </div>
                <div className="px-2 flex flex-col gap-2">
                    <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold border border-white/5 hover:border-white/10 transition-all duration-200">
                        View Storefront
                    </Link>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }} className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold border border-red-500/10 hover:border-red-500/20 transition-all duration-200">
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