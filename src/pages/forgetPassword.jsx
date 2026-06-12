import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiKey, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export default function ForgetPassword() {

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Forgot Password | IONIX Computers";
    }, []);

    function sendEmail() {
        if (!email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        api.post("/users/send-otp", {
            email: email
        }).then(() => {
            setIsEmailSent(true);
            toast.success("OTP sent to your email!");
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Failed to send OTP.");
        });
    }

    async function resetPassword() {
        if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await api.post("/users/verify-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to reset password.");
        }
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

            <div className="relative w-full max-w-md z-10">
                <div className="w-full glass-card p-6 sm:p-10 border border-white/8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">
                    
                    {/* Brand Logo & Heading */}
                    <div className="flex flex-col items-center mb-6">
                        <Link to="/" className="mb-4 group">
                            <img 
                                src="/logo.png" 
                                alt="IONIX Logo" 
                                className="h-12 sm:h-14 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105" 
                            />
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                            Reset Password
                        </h1>
                    </div>

                    {!isEmailSent && (
                        <div className="w-full flex flex-col items-center">
                            <p className="text-xs text-gray-400 mb-8 text-center leading-relaxed font-light">
                                Enter your email address to receive an OTP (One-Time Password) to reset your password safely.
                            </p>
                            
                            {/* Email Address Input */}
                            <div className="w-full flex flex-col gap-2 mb-6">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">Email Address</label>
                                <div className="relative flex items-center">
                                    <FiMail className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                    />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                onClick={sendEmail}
                                className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider mb-6"
                            >
                                Send OTP Link
                            </button>
                        </div>
                    )}

                    {isEmailSent && (
                        <div className="w-full flex flex-col items-center">
                            <p className="text-xs text-gray-400 mb-6 text-center leading-relaxed font-light">
                                Enter the OTP code sent to your email and select your new password.
                            </p>
                            
                            {/* OTP Code Input */}
                            <div className="w-full flex flex-col gap-2 mb-5">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">OTP Code</label>
                                <div className="relative flex items-center">
                                    <FiKey className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Enter OTP Code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                    />
                                </div>
                            </div>

                            {/* New Password Input */}
                            <div className="w-full flex flex-col gap-2 mb-5">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">New Password</label>
                                <div className="relative flex items-center">
                                    <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-gray-500 hover:text-white transition-colors cursor-pointer focus:outline-none"
                                    >
                                        {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="w-full flex flex-col gap-2 mb-8">
                                <label className="text-xs font-semibold text-gray-400 tracking-wider">Confirm New Password</label>
                                <div className="relative flex items-center">
                                    <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 text-gray-500 hover:text-white transition-colors cursor-pointer focus:outline-none"
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={resetPassword}
                                className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider mb-6"
                            >
                                Reset Password
                            </button>
                        </div>
                    )}

                    {/* Back to Login */}
                    <div className="w-full flex justify-center border-t border-white/5 pt-6 mt-2">
                        <Link 
                            to="/login" 
                            className="text-xs font-medium text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                        >
                            <FiArrowLeft className="text-sm" /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}