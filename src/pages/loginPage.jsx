import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../utils/api";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign In | IONIX Computers";
    }, []);

    const googleLogin = useGoogleLogin(
        {
            onSuccess: (response) => {
                api.post("/users/google-login", {
                    token: response.access_token
                }).then((response) => {
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login successful!");
                    if (response.data.isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }
                }).catch(() => {
                    toast.error("Google login failed!")
                })
            },
            onError: () => {
                toast.error("Google login failed!")
            }
        }
    )

    function handleLogin() {
        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        axios.post(import.meta.env.VITE_API_URL + "/users/login", {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            toast.success("Login successful!");
            if (response.data.isAdmin) {
                navigate("/admin")
            } else {
                navigate("/")
            }
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Login failed!");
        });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative px-4 py-8 sm:py-12">
            {/* Rich dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-black/60 z-0"></div>

            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-auto h-auto bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Tech grid mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="w-full max-w-md z-10">
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
                            Sign In
                        </h1>
                        <p className="text-xs text-gray-400 mt-1.5 font-light text-center">
                            Access your account and track your orders.
                        </p>
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
                    <div className="w-full flex flex-col gap-2 mb-2">
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

                    {/* Forgot Password */}
                    <div className="w-full flex justify-end mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-accent hover:text-accent-light transition-colors duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider mb-4"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="w-full flex items-center gap-3 my-4">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Or continue with</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    {/* Google Login Button */}
                    <button
                        onClick={googleLogin}
                        className="w-full py-3 bg-white/[0.03] border border-white/8 hover:bg-white/[0.08] hover:border-white/20 text-white font-semibold rounded-xl flex justify-center items-center gap-3.5 transition-all duration-300 cursor-pointer shadow-md text-base md:text-sm"
                    >
                        <FcGoogle className="text-xl" /> Sign in with Google
                    </button>

                    {/* Register redirect */}
                    <p className="mt-8 text-xs text-gray-400 font-light text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-accent hover:text-accent-light font-bold transition-colors duration-200"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}