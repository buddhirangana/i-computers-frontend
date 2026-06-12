import { useState, useEffect } from "react";
import { getCartTotal } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import {
    FiUser,
    FiMapPin,
    FiHome,
    FiGlobe,
    FiLayers,
    FiPhone,
    FiShoppingBag,
    FiArrowRight,
    FiCreditCard
} from "react-icons/fi";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(location.state || []);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        document.title = "Checkout | IONIX Computers";
    }, []);

    // If checkout page is accessed with no cart state
    if (!cart || cart.length === 0) {
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
                        Session Expired
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed font-light">
                        It looks like you don't have an active checkout session. Go to your cart to checkout your items!
                    </p>
                    <Link
                        to="/cart"
                        className="px-8 py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer"
                    >
                        Back to Cart
                    </Link>
                </div>
            </div>
        );
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        // Validations
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !addressLineOne.trim() ||
            !city.trim() ||
            !state.trim() ||
            !postalCode.trim() ||
            !phone.trim()
        ) {
            toast.error("Please fill in all shipping details.");
            return;
        }

        setIsPlacingOrder(true);
        try {
            const token = localStorage.getItem("token");

            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items: cart.map((item) => ({
                    productId: item.product.productId,
                    quantity: item.quantity,
                })),
            };

            const result = await api.post("/orders", data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            toast.success(result.data?.message || "Order placed successfully!");
            // Clear cart from local storage
            localStorage.setItem("cart", "[]");
            navigate("/my-orders");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "An error occurred while placing your order. Please try again."
            );
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-4 sm:px-6 pb-[150px] lg:pb-28">
            {/* Background Mesh Overlay & Glowing Spotlights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                            Secure Checkout
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">
                            Checkout details
                        </h1>
                        <p className="text-sm text-gray-500 mt-2 font-light">
                            Enter your details and place your order
                        </p>
                    </div>
                </div>

                {/* Main Two-Column Layout */}
                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Shipping Address Form */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="glass-card p-6 sm:p-8 border border-white/8 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col gap-6">
                            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">
                                Shipping Address
                            </h2>

                            {/* Name fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                        First Name *
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="John"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                        Last Name *
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address Line 1 */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                    Address Line 1 *
                                </label>
                                <div className="relative flex items-center">
                                    <FiMapPin className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="123 Tech Lane"
                                        value={addressLineOne}
                                        onChange={(e) => setAddressLineOne(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Line 2 */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                    Address Line 2 (Optional)
                                </label>
                                <div className="relative flex items-center">
                                    <FiMapPin className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Suite 404 or Apartment"
                                        value={addressLineTwo}
                                        onChange={(e) => setAddressLineTwo(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                    />
                                </div>
                            </div>

                            {/* City, State, Postal Code */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                        City *
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiHome className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Colombo"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                        State *
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiGlobe className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Western"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                        Postal Code *
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiLayers className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="10000"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">
                                    Phone Number *
                                </label>
                                <div className="relative flex items-center">
                                    <FiPhone className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type="tel"
                                        placeholder="+94 77 123 4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 border border-white/8 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col gap-5 sticky top-24">
                            <h3 className="text-lg font-black text-white uppercase tracking-wider border-b border-white/5 pb-3">
                                Order Summary
                            </h3>

                            {/* Cart Item Cards Mini Scroll */}
                            <div className="flex flex-col gap-3.5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 items-center bg-white/2 border border-white/5 p-2 rounded-xl"
                                    >
                                        <img
                                            src={item.product?.image || "https://www.w3schools.com/howto/img_avatar.png"}
                                            alt={item.product?.name}
                                            className="w-11 h-11 object-cover rounded-lg border border-white/10 shrink-0 bg-white/5"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-white truncate">
                                                {item.product?.name}
                                            </h4>
                                            <div className="flex justify-between items-baseline mt-0.5 text-[10px] text-gray-500 font-light">
                                                <span>Qty: {item.quantity}</span>
                                                <span className="font-mono">
                                                    {getFormattedPrice(item.product?.price || 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-white/5" />

                            {/* Summary Values */}
                            <div className="flex flex-col gap-3 text-xs font-light text-gray-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-semibold text-white font-mono">
                                        {getFormattedPrice(getCartTotal(cart))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Shipping</span>
                                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                                        Free
                                    </span>
                                </div>
                                <hr className="border-white/5 my-1" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                                        Grand Total
                                    </span>
                                    <span className="text-lg font-black text-accent-light font-mono text-glow-blue">
                                        {getFormattedPrice(getCartTotal(cart))}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPlacingOrder}
                                className="w-full py-4 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] disabled:opacity-40 disabled:pointer-events-none text-white font-bold rounded-xl transition-all duration-300 text-center text-xs tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>{isPlacingOrder ? "Placing Order..." : "Confirm & Place Order"}</span>
                                {!isPlacingOrder && (
                                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                                )}
                            </button>

                            {/* Security badge */}
                            <div className="flex items-center justify-center gap-2 mt-1 bg-white/2 border border-white/5 p-3.5 rounded-xl text-[10px] text-gray-400 font-light">
                                <FiCreditCard className="text-sm text-accent-light" />
                                <span>Cash on Delivery / Card Payment Secure</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}