import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import getFormattedPrice from "../utils/price-format";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export default function CustomerOrderDetailsModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const order = props.order


    return (
        <>
            <FaEye className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={
                    () => {
                        setIsModalOpen(true)
                    }
                }
            />
            {
                isModalOpen &&
                <div className="w-screen h-screen fixed bg-black/60 backdrop-blur-md top-0 left-0 flex justify-center items-center text-white z-99 animate-fade-in">
                    <div className="w-[800px] max-w-[95vw] bg-[#0b0f19]/90 glass-card shadow-glow-blue flex flex-col justify-center items-center rounded-2xl p-6 relative border border-white/10">

                        <button className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-white text-xl font-bold transition-colors" onClick={() => setIsModalOpen(false)}>×</button>

                        <div className="w-full">
                            <div className="w-full flex flex-wrap items-center gap-3 border-b border-white/5 pb-4 mb-4">
                                <span className="inline-block rounded-md bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
                                    ID: {order.orderId}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400 italic ml-2">{order.email}</span>
                                </div>
                                <div className="flex flex-col gap-2 ml-auto">
                                    <span className="text-gray-300 flex justify-center items-center gap-2 text-sm"><FaPhoneAlt className="text-accent" />{order.phone}</span>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center mt-2">
                                <div className="flex justify-center items-center gap-3">
                                    <MdHome className="text-xl text-accent-light shrink-0" />
                                    <p className="text-gray-300 text-sm">
                                        <span className="font-bold text-white">{order.firstName} {order.lastName}</span>, {order.addressLineOne} {order.addressLineTwo}, {order.city}, {order.state}, {order.postalCode}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="w-full flex flex-wrap gap-4 items-center mt-3 pb-3 border-b border-white/5">
                                <span className="text-sm text-gray-400">Order Date: {new Date(order.date).toLocaleDateString()}</span>
                                <span className="inline-block rounded-full bg-blue-950/40 text-blue-400 border border-blue-900/50 px-3 py-1 text-xs font-semibold">
                                    {order.status}
                                </span>
                            </div>
                            
                            {order.notes && (
                                <div className="w-full flex flex-col gap-1 mt-3 pb-3 border-b border-white/5">
                                    <p className="text-white font-semibold text-sm">Order Notes:</p>
                                    <p className="text-sm text-gray-400 italic">{order.notes}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="w-full h-[250px] flex flex-col overflow-y-auto items-center p-2 mt-4 custom-scrollbar">
                            {
                                order.items.map(
                                    (item, index) => {
                                        return (
                                            <div key={index} className="w-full flex justify-between items-center bg-white/3 border border-white/5 rounded-xl p-3 mb-3 hover:border-accent/30 transition-all duration-200">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-[70px] h-[70px] object-cover rounded-lg border border-white/10" src={item.product.image} alt={item.product.name} />
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-white text-sm line-clamp-1">{item.product.name}</span>
                                                        <span className="text-xs text-gray-400">Quantity: {item.quantity}</span>
                                                        <span className="text-xs text-gray-400">Price: {getFormattedPrice(item.product.price)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold text-accent-light">
                                                    {getFormattedPrice(item.product.price * item.quantity)}
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        
                        <div className="w-full flex justify-end items-center bg-white/5 border border-white/5 rounded-xl p-4 mt-4">
                            <span className="text-lg font-bold text-white">
                                Total: <span className="text-accent-light">{getFormattedPrice(order.total)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
