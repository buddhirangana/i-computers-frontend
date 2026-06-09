import { Link } from "react-router-dom";
import { FaEye, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import LoadingAnimation from "../components/loadingAnimation";
import ProductDeleteModel from "../components/productDeleteModel";
import getFormattedPrice from "../utils/price-format";
import CustomerOrderDetailsModal from "../components/customerOrderDetailsModal";

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

    useEffect(() => {
        document.title = "My Orders | iComputers";
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
    }, [isOrdersAreLoaded]);

    return (
        <div className="w-full h-full overflow-y-scroll bg-primary p-6 rounded-lg text-gray-300">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl glass-card border border-white/8 shadow-md flex items-center justify-between px-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white text-glow-blue">Orders</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage your store Orders with ease
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                        Total Orders: <span className="font-semibold text-white">{totalOrders}</span>
                    </span>
                </div>
            </div>

            {isOrdersAreLoaded ? (
                <>
                    <div className="w-full overflow-x-auto rounded-2xl border border-white/8 bg-white/3 backdrop-blur-md shadow-md">
                        <table className="w-full min-w-[1200px] text-sm text-gray-300">
                            <thead className="bg-white/5 text-white">
                                <tr>
                                    <th className="text-left font-semibold px-5 py-4">
                                        Order ID
                                    </th>
                                    <th className="text-left font-semibold px-5 py-4">Email</th>
                                    <th className="text-left font-semibold px-5 py-4">
                                        First Name
                                    </th>
                                    <th className="text-left font-semibold px-5 py-4">
                                        Last Name
                                    </th>
                                    <th className="text-left font-semibold px-5 py-4">Phone</th>
                                    <th className="text-left font-semibold px-5 py-4">Date</th>
                                    <th className="text-left font-semibold px-5 py-4">Total</th>
                                    <th className="text-left font-semibold px-5 py-4">Status</th>
                                    <th className="text-left font-semibold px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((item) => {
                                    return (
                                        <tr
                                            key={item.orderId}
                                            className="border-t border-white/5 hover:bg-white/3 transition-colors duration-200"
                                        >
                                            <td className="px-5 py-4">
                                                <span className="inline-block rounded-md bg-white/5 border border-white/8 px-3 py-1 text-xs font-medium text-gray-300">
                                                    {item.orderId}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-white">
                                                    {item.email}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-gray-400">
                                                {item.firstName}
                                            </td>

                                            <td className="px-5 py-4 text-gray-400">
                                                {item.lastName}
                                            </td>

                                            <td className="px-5 py-4 text-gray-300">{item.phone}</td>

                                            <td className="px-5 py-4 text-gray-400">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="font-semibold text-white">
                                                    {getFormattedPrice(item.total)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-block rounded-full bg-blue-950/40 text-blue-400 border border-blue-900/50 px-3 py-1 text-xs font-medium">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <CustomerOrderDetailsModal order={item} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-end items-center gap-3 mt-6">
                        <button
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                    setIsOrdersAreLoaded(false);
                                }
                            }}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer text-sm font-semibold"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-400">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                                setIsOrdersAreLoaded(false);
                            }}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer text-sm font-semibold"
                        >
                            Next
                        </button>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-[#0b0f19] border border-white/10 text-white rounded hover:bg-white/5 transition-colors duration-200 cursor-pointer text-sm"
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
