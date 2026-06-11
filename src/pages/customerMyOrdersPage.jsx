import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../components/loadingAnimation";
import getFormattedPrice from "../utils/price-format";
import CustomerOrderDetailsModal from "../components/customerOrderDetailsModal";
import { FiPackage, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function getStatusStyles(status) {
    const s = status ? status.toLowerCase() : "";
    if (s === "pending" || s === "processing") {
        return {
            badge: "bg-amber-500/5 text-amber-400 border-amber-500/20",
        };
    }
    if (s === "delivered" || s === "completed" || s === "shipped") {
        return {
            badge: "bg-emerald-500/5 text-emerald-400 border-emerald-500/20",
        };
    }
    if (s === "cancelled" || s === "failed") {
        return {
            badge: "bg-rose-500/5 text-rose-400 border-rose-500/20",
        };
    }
    return {
        badge: "bg-blue-500/5 text-blue-400 border-blue-500/20",
    };
}

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

    useEffect(() => {
        document.title = "My Orders | IONIX Computers";
    }, []);

    useEffect(() => {
        if (!isOrdersAreLoaded) {
            const token = localStorage.getItem("token");

            axios
                .get(
                    import.meta.env.VITE_API_URL +
                    "/orders/" +
                    pageSize +
                    "/" +
                    currentPage,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    },
                )
                .then((response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                    setTotalOrders(response.data.total);
                    setIsOrdersAreLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [isOrdersAreLoaded, pageSize, currentPage]);

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-4 sm:px-6 pb-[150px] lg:pb-28">
            {/* Background Mesh Overlay & Glowing Spotlights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                            Dashboard
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">
                            Order History
                        </h1>
                        <p className="text-sm text-gray-500 mt-2 font-light">
                            Track and manage your recent purchases
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-2xl px-5 py-3.5 shadow-md self-start md:self-auto backdrop-blur-md">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Total Purchases:
                        </span>
                        <span className="text-lg font-black text-white px-2.5 py-0.5 rounded-lg bg-accent/20 border border-accent/30 text-glow-blue font-mono">
                            {totalOrders}
                        </span>
                    </div>
                </div>

                {isOrdersAreLoaded ? (
                    <>
                        {orders.length === 0 ? (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 px-6 glass-card border border-white/8 rounded-2xl text-center max-w-lg mx-auto mt-6 backdrop-blur-md shadow-2xl">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-6 text-gray-400 text-3xl shadow-inner">
                                    <FiPackage />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                                    No Orders Yet
                                </h3>
                                <p className="text-sm text-gray-400 mb-8 max-w-xs font-light leading-relaxed">
                                    It looks like you haven't placed any orders yet. Check out our high-performance custom PCs and components!
                                </p>
                                <Link
                                    to="/products"
                                    className="px-6 py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            /* Orders List Grid */
                            <div className="flex flex-col gap-4">
                                {/* Desktop Header (Hidden on Mobile) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-wider text-gray-400">
                                    <div className="col-span-2">Order ID</div>
                                    <div className="col-span-3">Customer info</div>
                                    <div className="col-span-2">Order Date</div>
                                    <div className="col-span-2">Total amount</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-1 text-right">Details</div>
                                </div>

                                {/* Order Row Cards */}
                                {orders.map((item) => {
                                    const statusStyles = getStatusStyles(item.status);
                                    return (
                                        <div
                                            key={item.orderId}
                                            className="glass-card border border-white/8 p-5 md:p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 shadow-md backdrop-blur-md"
                                        >
                                            {/* Desktop layout */}
                                            <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm">
                                                <div className="col-span-2">
                                                    <span className="inline-block rounded-lg bg-white/5 border border-white/8 px-3 py-1.5 text-xs font-mono text-white font-semibold">
                                                        #{item.orderId ? String(item.orderId).slice(-8).toUpperCase() : "N/A"}
                                                    </span>
                                                </div>
                                                <div className="col-span-3">
                                                    <div className="font-bold text-white truncate">
                                                        {item.firstName} {item.lastName}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate mt-0.5 font-light">
                                                        {item.email}
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-gray-400 font-light">
                                                    {new Date(item.date).toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                                <div className="col-span-2 font-black text-accent-light text-base font-mono">
                                                    {getFormattedPrice(item.total)}
                                                </div>
                                                <div className="col-span-2">
                                                    <span
                                                        className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles.badge}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 flex justify-end">
                                                    <CustomerOrderDetailsModal order={item} />
                                                </div>
                                            </div>

                                            {/* Mobile layout */}
                                            <div className="md:hidden flex flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="inline-block rounded-lg bg-white/5 border border-white/8 px-2.5 py-1 text-xs font-mono text-white font-semibold mb-2">
                                                            #{item.orderId ? String(item.orderId).slice(-8).toUpperCase() : "N/A"}
                                                        </span>
                                                        <div className="font-bold text-white text-base">
                                                            {item.firstName} {item.lastName}
                                                        </div>
                                                        <div className="text-xs text-gray-400 font-light mt-0.5">
                                                            {item.email}
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles.badge}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>

                                                <hr className="border-white/5" />

                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-gray-500 font-medium">Date</span>
                                                        <span className="text-gray-300 font-light">
                                                            {new Date(item.date).toLocaleDateString(undefined, {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-1 text-right">
                                                        <span className="text-gray-500 font-medium">Total</span>
                                                        <span className="text-accent-light font-bold text-sm font-mono">
                                                            {getFormattedPrice(item.total)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <hr className="border-white/5" />

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 font-light">
                                                        {item.phone}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-400 font-medium">
                                                            View Details
                                                        </span>
                                                        <CustomerOrderDetailsModal order={item} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {orders.length > 0 && (
                            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-white/3 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                        Show rows:
                                    </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(parseInt(e.target.value));
                                            setIsOrdersAreLoaded(false);
                                        }}
                                        className="px-3 py-1.5 bg-primary/80 border border-white/8 text-white rounded-xl hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-accent transition-colors duration-200 cursor-pointer text-xs"
                                    >
                                        <option value={2}>2</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            if (currentPage > 1) {
                                                setCurrentPage(currentPage - 1);
                                                setIsOrdersAreLoaded(false);
                                            }
                                        }}
                                        disabled={currentPage === 1}
                                        className="p-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer text-sm font-semibold"
                                    >
                                        <FiChevronLeft className="text-base" />
                                    </button>
                                    <span className="text-xs text-gray-400 font-medium">
                                        Page <span className="text-white font-bold font-mono">{currentPage}</span> of{" "}
                                        <span className="text-white font-bold font-mono">{totalPages}</span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (currentPage < totalPages) {
                                                setCurrentPage(currentPage + 1);
                                                setIsOrdersAreLoaded(false);
                                            }
                                        }}
                                        disabled={currentPage === totalPages}
                                        className="p-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer text-sm font-semibold"
                                    >
                                        <FiChevronRight className="text-base" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        </div>
    );
}

