import { Link } from "react-router-dom";
import { FaEye, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import LoadingAnimation from "../../components/loadingAnimation";
import OrderDetailsModal from "../../components/orderDetailsModal";
import getFormattedPrice from "../../utils/price-format";
import ProductDeleteModel from "../../components/productDeleteModel";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

    useEffect(() => {
        document.title = "Manage Orders | IONIX Computers";
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
    }, [isOrdersAreLoaded]);

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase() || "";
        if (s === "pending") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 px-3 py-1 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending
                </span>
            );
        } else if (s === "cancelled" || s === "rejected" || s === "failed") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {status}
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 text-green-600 px-3 py-1 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {status}
                </span>
            );
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 rounded-lg custom-scrollbar-light">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white border border-white/10 shadow-lg flex items-center justify-between px-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl text-white shadow-inner">
                        <FiShoppingBag />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="text-xs text-white/80 mt-0.5">
                            Manage and moderate store Orders with ease
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg shadow-inner">
                        Total Orders: <span className="font-extrabold ml-1">{totalOrders}</span>
                    </span>
                </div>
            </div>

            {isOrdersAreLoaded ? (
                <>
                    <div className="w-full overflow-x-auto custom-scrollbar-light rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1200px] text-sm text-gray-700 whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-5 py-4">Order ID</th>
                                    <th className="text-left px-5 py-4">Email</th>
                                    <th className="text-left px-5 py-4">First Name</th>
                                    <th className="text-left px-5 py-4">Last Name</th>
                                    <th className="text-left px-5 py-4">Phone</th>
                                    <th className="text-left px-5 py-4">Date</th>
                                    <th className="text-left px-5 py-4">Total</th>
                                    <th className="text-left px-5 py-4">Status</th>
                                    <th className="text-left px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((item) => {
                                    return (
                                        <tr
                                            key={item.orderId}
                                            className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                                        >
                                            <td className="px-5 py-4">
                                                <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                    {item.orderId}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-gray-800">
                                                    {item.email}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-gray-500">
                                                {item.firstName}
                                            </td>

                                            <td className="px-5 py-4 text-gray-500">
                                                {item.lastName}
                                            </td>

                                            <td className="px-5 py-4 text-gray-700">{item.phone}</td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="font-bold text-gray-800">
                                                    {getFormattedPrice(item.total)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <OrderDetailsModal order={item} refresh={() => setIsOrdersAreLoaded(false)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-end items-center gap-3 mt-4">
                        <button
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                    setIsOrdersAreLoaded(false);
                                }
                            }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                                setIsOrdersAreLoaded(false);
                            }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Next
                        </button>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
}