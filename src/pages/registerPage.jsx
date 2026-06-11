import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign Up | IONIX Computers";
    }, []);

    function handleRegister() {
        if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        axios.post(import.meta.env.VITE_API_URL + "/users/", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }).then(() => {
            toast.success("Registered successfully!");
            navigate("/login");
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Registration failed!");
        });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative px-4 py-12">
            {/* Rich dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-black/60 z-0"></div>
            
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-auto h-auto bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Tech grid mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="relative w-full max-w-lg z-10">
                <div className="w-full glass-card p-6 sm:p-10 border border-white/8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">
                    
                    {/* Brand Logo & Heading */}
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="mb-4 group">
                            <img 
                                src="/logo.png" 
                                alt="IONIX Logo" 
                                className="h-12 sm:h-14 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105" 
                            />
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider text-center">
                            Sign Up
                        </h1>
                        <p className="text-xs text-gray-400 mt-1.5 font-light text-center">
                            Create an account to track configurations and make purchases.
                        </p>
                    </div>

                    {/* First Name & Last Name Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400 tracking-wider">First Name</label>
                            <div className="relative flex items-center">
                                <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="John"
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400 tracking-wider">Last Name</label>
                            <div className="relative flex items-center">
                                <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    placeholder="Doe"
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email Input Field */}
                    <div className="w-full flex flex-col gap-2 mb-5">
                        <label className="text-xs font-semibold text-gray-400 tracking-wider">Email Address</label>
                        <div className="relative flex items-center">
                            <FiMail className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="name@example.com"
                                type="email"
                                className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input Field */}
                    <div className="w-full flex flex-col gap-2 mb-5">
                        <label className="text-xs font-semibold text-gray-400 tracking-wider">Password</label>
                        <div className="relative flex items-center">
                            <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-500 hover:text-white transition-colors cursor-pointer focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input Field */}
                    <div className="w-full flex flex-col gap-2 mb-8">
                        <label className="text-xs font-semibold text-gray-400 tracking-wider">Confirm Password</label>
                        <div className="relative flex items-center">
                            <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                placeholder="••••••••"
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 text-gray-500 hover:text-white transition-colors cursor-pointer focus:outline-none"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={handleRegister} 
                        className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider mb-6"
                    >
                        Sign Up
                    </button>

                    {/* Login redirect */}
                    <p className="text-xs text-gray-400 font-light text-center">
                        Already have an account?{" "}
                        <Link 
                            to="/login" 
                            className="text-accent hover:text-accent-light font-bold transition-colors duration-200"
                        >
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}