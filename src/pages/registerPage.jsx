import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Sign Up | IONIX Computers";
    }, []);

    function handleRegister() {

        if (password != confirmPassword) {
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
            navigate("/login")
        }).catch((error) => {
            toast.error(error.response.data.message)
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative">
            {/* Solid dark overlay to ensure readability */}
            <div className="absolute inset-0 bg-black/78 z-0"></div>

            <div className="w-0 lg:w-1/2 h-full z-10"></div>
            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center z-10">
                <div className="w-[500px] h-[550px] glass-card shadow-glow-blue flex flex-col justify-center items-center p-6 border border-white/10">
                    <h1 className="text-4xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Sign Up</h1>
                    <div className="w-3/4 flex gap-4 mb-5">
                        <input
                            onChange={
                                (e) => {
                                    setFirstName(e.target.value)
                                }
                            }
                            value={firstName}
                            placeholder="First Name"
                            type="text"
                            className="w-1/2 p-3 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                        <input
                            onChange={
                                (e) => {
                                    setLastName(e.target.value)
                                }
                            }
                            value={lastName}
                            placeholder="Last Name"
                            type="text"
                            className="w-1/2 p-3 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                        value={email}
                        placeholder="Email"
                        type="email"
                        className="w-3/4 p-3 mb-5 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                        value={password}
                        placeholder="Password"
                        type="password"
                        className="w-3/4 p-3 mb-5 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                    <input
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        className="w-3/4 p-3 mb-6 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                    <button 
                        onClick={handleRegister} 
                        className="w-3/4 p-3 bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white font-bold rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        Sign Up
                    </button>
                    <p className="mt-5 w-3/4 text-center text-sm text-gray-300">
                        Already have an account? <Link to="/login" className="text-accent hover:text-accent-light font-medium transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}