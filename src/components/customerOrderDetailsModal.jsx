import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { MdHome, MdOutlineEmail, MdCalendarToday, MdClose } from "react-icons/md";
import getFormattedPrice from "../utils/price-format";

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

export default function CustomerOrderDetailsModal(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const order = props.order;

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-accent/15 hover:border-accent/35 text-accent-light hover:text-white transition-all duration-300 shadow-md group focus:outline-none cursor-pointer"
                title="View Details"
            >
                <FaEye className="text-base group-hover:scale-110 transition-transform duration-300" />
            </button>

            {isModalOpen && createPortal(
                <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex justify-center items-center text-white z-[999] animate-fade-in p-4">
                    <div className="w-[700px] max-w-full bg-[#0b0f19]/90 glass-card shadow-2xl border border-white/10 rounded-3xl p-6 sm:p-8 relative flex flex-col animate-scale-in">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none cursor-pointer text-lg font-bold"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <MdClose className="text-lg" />
                        </button>

                        <div className="w-full">
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 pb-3 border-b border-white/5">
                                Order Details
                            </h3>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-6 mb-6">
                                {/* Delivery Address Card */}
                                <div className="flex flex-col gap-2.5">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Delivery Address
                                    </h4>
                                    <div className="flex gap-3 bg-white/3 border border-white/5 p-4 rounded-2xl h-full">
                                        <MdHome className="text-xl text-accent-light shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-white text-sm">
                                                {order.firstName} {order.lastName}
                                            </div>
                                            <p className="text-xs text-gray-400 leading-relaxed mt-1.5 font-light">
                                                {order.addressLineOne}
                                                {order.addressLineTwo && <>, {order.addressLineTwo}</>}
                                                <br />
                                                {order.city}, {order.state} {order.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Telemetry Card */}
                                <div className="flex flex-col gap-2.5">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Metadata
                                    </h4>
                                    <div className="flex flex-col gap-2.5 bg-white/3 border border-white/5 p-4 rounded-2xl text-xs font-light text-gray-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium">Order ID</span>
                                            <span className="font-semibold text-white">
                                                #{order.orderId ? String(order.orderId).toUpperCase() : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium flex items-center gap-1">
                                                <MdCalendarToday className="text-xs" /> Date
                                            </span>
                                            <span className="text-white font-medium">
                                                {new Date(order.date).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium flex items-center gap-1">
                                                <FaPhoneAlt className="text-[10px]" /> Phone
                                            </span>
                                            <span className="font-medium text-white">{order.phone}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium flex items-center gap-1">
                                                <MdOutlineEmail className="text-xs" /> Email
                                            </span>
                                            <span
                                                className="truncate max-w-[160px] font-medium text-white font-mono"
                                                title={order.email}
                                            >
                                                {order.email}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium">Status</span>
                                            <span
                                                className={`inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                                    getStatusStyles(order.status).badge
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Notes */}
                            {order.notes && (
                                <div className="w-full flex flex-col gap-1.5 mb-6 bg-white/2 border border-white/5 p-3 rounded-xl">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Notes
                                    </p>
                                    <p className="text-xs text-gray-400 italic font-light">{order.notes}</p>
                                </div>
                            )}

                            {/* Items List */}
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Items Ordered
                            </h4>
                            <div className="w-full max-h-[200px] overflow-y-auto flex flex-col gap-2.5 pr-2 custom-scrollbar">
                                {order.items &&
                                    order.items.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="w-full flex justify-between items-center bg-white/2 border border-white/5 rounded-2xl p-3 hover:border-accent/30 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        className="w-14 h-14 object-cover rounded-xl border border-white/10 shrink-0"
                                                        src={item.product?.image || "https://www.w3schools.com/howto/img_avatar.png"}
                                                        alt={item.product?.name || "Product"}
                                                    />
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-white text-sm line-clamp-1 max-w-[200px] sm:max-w-[320px]">
                                                            {item.product?.name || "Unknown Product"}
                                                        </span>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                                                            <span>Quantity: {item.quantity}</span>
                                                            <span>•</span>
                                                            <span className="font-mono">
                                                                {getFormattedPrice(item.product?.price || 0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold text-accent-light font-mono text-right shrink-0">
                                                    {getFormattedPrice((item.product?.price || 0) * item.quantity)}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Grand Total Summary */}
                        <div className="w-full flex justify-between items-center bg-white/5 border border-white/5 rounded-2xl p-4 mt-6">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Total Amount
                            </span>
                            <span className="text-xl font-bold text-accent-light font-mono text-glow-blue">
                                {getFormattedPrice(order.total)}
                            </span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

