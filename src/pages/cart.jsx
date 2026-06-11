import { useState, useEffect } from "react";
import { addToCart, getCart, getCartTotal, deleteFromCart } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    useEffect(() => {
        document.title = "Your Shopping Cart | IONIX Computers";
    }, []);

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-4 sm:px-6 flex items-center justify-center">
                {/* Background spotlights & mesh */}
                <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

                <div className="max-w-lg mx-auto text-center relative z-10 flex flex-col items-center justify-center py-16 px-6 glass-card border border-white/8 rounded-3xl backdrop-blur-md shadow-2xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-6 text-gray-400 text-3xl shadow-inner">
                        <FiShoppingBag />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tight">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed font-light">
                        Looks like you haven't added anything to your cart yet. Explore our high-performance custom PCs and components!
                    </p>
                    <Link
                        to="/products"
                        className="px-8 py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-4 sm:px-6 pb-[150px] lg:pb-28">
            {/* Background Mesh Overlay & Glowing Spotlights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                            Shopping Session
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">
                            Your Cart
                        </h1>
                        <p className="text-sm text-gray-500 mt-2 font-light">
                            Manage your items and prepare for checkout
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-2xl px-5 py-3.5 shadow-md self-start md:self-auto backdrop-blur-md">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Cart Items:
                        </span>
                        <span className="text-lg font-black text-white px-2.5 py-0.5 rounded-lg bg-accent/20 border border-accent/30 text-glow-blue font-mono">
                            {cart.length}
                        </span>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Items (Col span 2) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {cart.map((item) => (
                            <div
                                key={item.product.productId}
                                className="glass-card border border-white/8 p-4 sm:p-5 rounded-2xl hover:border-accent/40 transition-all duration-300 shadow-md backdrop-blur-md flex flex-col sm:flex-row gap-4 items-start sm:items-center relative"
                            >
                                {/* Image */}
                                <img
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-white/10 shrink-0 bg-white/5 hover:scale-102 transition-transform duration-300"
                                    src={item.product.image || "https://www.w3schools.com/howto/img_avatar.png"}
                                    alt={item.product.name}
                                />

                                {/* Info and price */}
                                <div className="flex-1 min-w-0 pr-8 sm:pr-0">
                                    <h3 className="font-bold text-white text-base sm:text-lg line-clamp-2 leading-snug">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5 font-mono font-light">
                                        ID: {item.product.productId}
                                    </p>
                                    <div className="flex items-baseline gap-2.5 mt-2">
                                        <span className="text-accent-light font-bold text-sm sm:text-base font-mono">
                                            {getFormattedPrice(item.product.price)}
                                        </span>
                                        {item.product.labelledPrice > item.product.price && (
                                            <span className="text-xs text-gray-500 line-through font-mono">
                                                {getFormattedPrice(item.product.labelledPrice)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Controls & Subtotal */}
                                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                                    {/* Quantity Adjustment */}
                                    <div className="flex items-center bg-white/3 border border-white/8 rounded-full p-1 text-white shadow-inner">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                addToCart(item.product, -1);
                                                setCart(getCart());
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/5 hover:text-accent-light transition-all cursor-pointer text-sm"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="text-sm font-semibold px-3 min-w-[20px] text-center font-mono">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                addToCart(item.product, 1);
                                                setCart(getCart());
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/5 hover:text-accent-light transition-all cursor-pointer text-sm"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    {/* Item Total Subtotal */}
                                    <div className="text-right">
                                        <span className="text-xs text-gray-500 block font-light">Subtotal</span>
                                        <span className="text-base sm:text-lg font-black text-white font-mono">
                                            {getFormattedPrice(item.product.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>

                                {/* Delete Item Trash Button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        deleteFromCart(item.product.productId);
                                        setCart(getCart());
                                    }}
                                    className="absolute top-4 right-4 sm:static sm:ml-4 text-red-500 hover:text-red-400 hover:bg-red-500/10 sm:hover:bg-red-500/10 sm:border sm:border-white/8 sm:hover:border-red-500/30 p-2 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer shrink-0"
                                    aria-label="Delete item from cart"
                                >
                                    <FiTrash2 className="text-lg" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Order Summary Sidebar (Col span 1) */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 border border-white/8 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col gap-5 sticky top-24">
                            <h3 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-3">
                                Order Summary
                            </h3>

                            <div className="flex flex-col gap-3.5 text-sm font-light text-gray-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-semibold text-white font-mono">
                                        {getFormattedPrice(getCartTotal(cart))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Shipping</span>
                                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                                        Free
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Estimated Tax</span>
                                    <span className="text-gray-400 italic text-xs">Calculated at checkout</span>
                                </div>
                                <hr className="border-white/5 my-1" />
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-bold text-white uppercase tracking-wider">
                                        Est. Total
                                    </span>
                                    <span className="text-xl font-black text-accent-light font-mono text-glow-blue">
                                        {getFormattedPrice(getCartTotal(cart))}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                state={cart}
                                className="w-full py-4 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 text-center text-xs tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>Proceed to Checkout</span>
                                <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>

                            <div className="flex flex-col gap-2.5 mt-2 bg-white/2 border border-white/5 p-4 rounded-xl text-[11px] text-gray-500 font-light leading-relaxed">
                                <p className="font-semibold text-gray-400 uppercase tracking-wider">
                                    Secure Checkout Guarantee
                                </p>
                                <p>
                                    We utilize state-of-the-art SSL encryption layers to keep your transaction data completely private and protected.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}