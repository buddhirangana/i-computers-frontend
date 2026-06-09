import { useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Forgot Password | iComputers";
    }, []);

    function sendEmail() {

        api.post("/users/send-otp", {
            email: email
        }).then(() => {
            setIsEmailSent(true);
            toast.success("OTP sent to your email!");
        }
        ).catch((error) => {
            toast.error(error.response.data.message);
        });
    }

    async function resetPassword() {

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
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative">
            {/* Solid dark overlay to ensure readability */}
            <div className="absolute inset-0 bg-black/78 z-0"></div>

            <div className="w-0 lg:w-1/2 h-full z-10"></div>
            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center z-10">
                {!isEmailSent && (
                    <div className="w-full h-[500px] glass-card shadow-glow-blue flex flex-col justify-center items-center p-8 border border-white/10">
                        <h1 className="text-4xl font-bold mb-4 text-white tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Forgot Password</h1>
                        <p className="text-sm text-gray-300 mb-8 text-center max-w-xs">Enter your email address to receive an OTP to reset your password.</p>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-3/4 p-3 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                        <button
                            onClick={sendEmail}
                            className="mt-6 w-3/4 p-3 bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white font-bold rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Send OTP Link
                        </button>
                    </div>
                )}
                {isEmailSent && (
                    <div className="w-full h-[500px] glass-card shadow-glow-blue flex flex-col justify-center items-center p-8 border border-white/10">
                        <h1 className="text-4xl font-extrabold mb-4 text-white tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Forgot Password</h1>
                        <p className="text-sm text-gray-300 mb-6 text-center max-w-xs">Enter the OTP sent to your email and choose a new password.</p>
                        <input
                            type="text"
                            placeholder="Enter OTP Code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-3/4 p-3 mb-4 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-3/4 p-3 mb-4 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-3/4 p-3 mb-6 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                        <button
                            onClick={resetPassword}
                            className="w-3/4 p-3 bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white font-bold rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}