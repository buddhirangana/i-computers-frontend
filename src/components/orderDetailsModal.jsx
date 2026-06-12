import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FiX, FiCalendar, FiMail, FiInfo } from "react-icons/fi";
import getFormattedPrice from "../utils/price-format";
import api from "../utils/api";

export default function OrderDetailsModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [notes, setNotes] = useState(props.order.notes)
    const [status, setStatus] = useState(props.order.status)
    const [isUpdating, setIsUpdating] = useState(false)

    const order = props.order
    const refresh = props.refresh

    async function updateOrder() {
        setIsUpdating(true)
        const token = localStorage.getItem("token");

        try {
            await api.put("/orders/" + order.orderId, {
                notes: notes,
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Order updated successfully")
            refresh()
            setIsUpdating(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to update order")
            setIsUpdating(false)
        }
    }

    const getStatusBadge = (status) => {
        const s = status ? status.toLowerCase() : "";
        if (s === "pending") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending
                </span>
            );
        } else if (s === "cancelled" || s === "rejected" || s === "failed") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {status}
                </span>
            );
        } else if (s === "processing" || s === "shipped") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    {status}
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {status}
                </span>
            );
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 border border-blue-100 hover:border-blue-200 cursor-pointer flex items-center justify-center shadow-sm"
                title="View Order Details"
            >
                <FaEye className="text-base" />
            </button>
            
            {
                isModalOpen &&
                <div className="w-screen h-screen fixed bg-slate-900/60 backdrop-blur-sm top-0 left-0 flex justify-center items-center text-slate-800 z-[100] p-4">
                    <div className="w-full max-w-3xl bg-white flex flex-col rounded-3xl shadow-2xl relative max-h-[90vh] overflow-hidden border border-gray-100 animate-[fadeIn_0.2s_ease-out]">
                        
                        {/* Header Banner */}
                        <div className="bg-gradient-to-r from-accent to-blue-600 px-6 py-5 text-white flex justify-between items-center shrink-0">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-2.5 py-0.5 rounded">
                                        Order Overview
                                    </span>
                                    <span className="text-xs text-white/80 font-mono font-medium">#{order.orderId}</span>
                                </div>
                                <h2 className="text-lg font-bold mt-1">Customer Order Details</h2>
                            </div>
                            
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="bg-white/10 hover:bg-white/20 border border-white/10 p-2 rounded-xl text-white transition-all duration-200 cursor-pointer flex items-center justify-center shadow-inner"
                            >
                                <FiX className="text-lg" />
                            </button>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar-light p-6 flex flex-col gap-6">
                            
                            {/* Customer & Delivery Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                {/* Delivery Info Box */}
                                <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider border-b border-gray-200/50 pb-2">
                                        <MdHome className="text-lg" />
                                        <span>Delivery Address</span>
                                    </div>
                                    <div className="text-sm text-gray-700 leading-relaxed">
                                        <p className="font-bold text-gray-900 text-sm mb-1">{order.firstName} {order.lastName}</p>
                                        <p>{order.addressLineOne}</p>
                                        {order.addressLineTwo && <p>{order.addressLineTwo}</p>}
                                        <p>{order.city}, {order.state} {order.postalCode}</p>
                                    </div>
                                </div>

                                {/* Contact & Status Info Box */}
                                <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-4 flex flex-col justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider border-b border-gray-200/50 pb-2">
                                            <FiInfo className="text-base" />
                                            <span>Contact & Order Info</span>
                                        </div>
                                        <div className="text-sm text-gray-700 mt-2.5 flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <FiMail className="text-gray-400 shrink-0" />
                                                <span className="truncate italic font-medium">{order.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaPhoneAlt className="text-gray-400 shrink-0" />
                                                <span className="font-mono">{order.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-gray-400 shrink-0" />
                                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200/50 pt-2 mt-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Status:</span>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </div>

                            </div>

                            {/* Order Notes (If they exist) */}
                            {order.notes && (
                                <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Customer/Order Notes</span>
                                    <p className="text-sm text-blue-900/80 leading-relaxed italic">"{order.notes}"</p>
                                </div>
                            )}

                            {/* Items Section */}
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ordered Items ({order.items.length})</span>
                                <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto custom-scrollbar-light pr-1.5">
                                    {order.items.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="flex justify-between items-center bg-white border border-gray-200/70 hover:border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <img 
                                                    className="w-14 h-14 object-contain rounded-xl border border-gray-100 bg-gray-50/50 p-1 shrink-0" 
                                                    src={item.product.image || (item.product.images && item.product.images[0])} 
                                                    alt={item.product.name}
                                                />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-gray-800 text-sm truncate max-w-[280px] sm:max-w-md" title={item.product.name}>
                                                        {item.product.name}
                                                    </span>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                                        <span>Qty: <span className="text-gray-700 font-bold">{item.quantity}</span></span>
                                                        <span>•</span>
                                                        <span>Unit Price: <span className="text-gray-700 font-bold">{getFormattedPrice(item.product.price)}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-black text-gray-800 font-mono shrink-0 ml-4">
                                                {getFormattedPrice(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Highlight */}
                            <div className="bg-gray-50 border border-gray-200/50 rounded-2xl px-5 py-4 flex justify-between items-center shrink-0">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Amount Due</span>
                                <span className="text-lg font-black text-accent font-mono bg-accent/5 px-4 py-1.5 border border-accent/10 rounded-xl">
                                    {getFormattedPrice(order.total)}
                                </span>
                            </div>

                            {/* Action form: Update notes / status */}
                            <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Moderate & Update Order</h4>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                    <div className="md:col-span-6 flex flex-col gap-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Internal/Order Notes</label>
                                        <textarea 
                                            value={notes} 
                                            placeholder="Add memo, tracking IDs or internal notes here..."
                                            className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200 h-18 resize-none" 
                                            onChange={(e) => setNotes(e.target.value)} 
                                        />
                                    </div>
                                    <div className="md:col-span-3 flex flex-col gap-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order Status</label>
                                        <select 
                                            value={status} 
                                            className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200 cursor-pointer" 
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-3">
                                        <button 
                                            className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-200 cursor-pointer disabled:opacity-50"
                                            onClick={updateOrder} 
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? "Updating..." : "Update Order"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}
