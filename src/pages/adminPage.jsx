import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminProductsPage from "./admin/adminProductPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";

export default function AdminPage() {
    useEffect(() => {
        document.title = "Admin Dashboard | iComputers";
    }, []);

    return (
        <div className="w-full h-screen flex items-center bg-primary text-white font-sans">
            {/* Sidebar */}
            <div className="w-[260px] h-full bg-secondary border-r border-white/5 flex flex-col justify-between py-8 px-4 shrink-0">
                <div className="flex flex-col gap-6">
                    <div className="px-4 mb-4">
                        <span className="text-xl font-extrabold tracking-wider text-white bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">iComputers</span>
                        <span className="block text-xs text-accent font-semibold uppercase tracking-widest mt-1">Admin Panel</span>
                    </div>
                    <nav className="flex flex-col gap-1.5">
                        <Link to="/admin/" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Orders</Link>
                        <Link to="/admin/products" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Products</Link>
                        <Link to="/admin/users" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Users</Link>
                        <Link to="/admin/reviews" className="block py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Reviews</Link>
                    </nav>
                </div>
                <div className="px-2">
                    <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold border border-white/5 hover:border-white/10 transition-all duration-200">
                        View Storefront
                    </Link>
                </div>
            </div>
            {/* Content Area */}
            <div className="w-[calc(100%-260px)] h-full bg-primary p-4">
                <div className="w-full h-full bg-[#030712] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
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