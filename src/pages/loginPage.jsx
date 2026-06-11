import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    useEffect(() => {
        document.title = "Sign In | iComputers";
    }, []);

    function handleLogin() {
        axios.post(import.meta.env.VITE_API_URL + "/users/login", {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            //alert("Login successful!");
            toast.success("Login successful!");
            if (response.data.isAdmin) {
                //redirect to admin dashboard
                //window.location.href = "/admin"
                navigate("/admin")
            } else {
                //redirect to homepage
                //window.location.href = "/"
                navigate("/")
            }
        }).catch((error) => {
            //alert(error.response.data.message);
            toast.error(error.response.data.message)
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative">
            {/* Solid dark overlay to ensure readability */}
            <div className="absolute inset-0 bg-black/78 z-0"></div>
            
            <div className="w-0 lg:w-1/2 h-full z-10"></div>
            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center z-10">
                <div className="w-[400px] h-[500px] glass-card shadow-glow-blue flex flex-col justify-center items-center p-6 border border-white/10">
                    <h1 className="text-4xl font-bold mb-8 text-white tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Sign In</h1>
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                        value={email}
                        placeholder="Email"
                        type="email"
                        className="w-3/4 p-3 mb-6 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
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
                        className="w-3/4 p-3 rounded-lg glass-input border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                    <p className="mb-6 mt-2 w-3/4 text-right text-sm text-gray-300">
                        Forget password? <Link to="/forgot-password" className="text-accent hover:text-accent-light font-medium transition-colors">Click here</Link>
                    </p>
                    <button 
                        onClick={handleLogin} 
                        className="w-3/4 p-3 bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white font-bold rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        Sign in
                    </button>
                    <button 
                        onClick={googleLogin} 
                        className="w-3/4 p-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg mt-4 flex justify-center items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                    >
                        <FcGoogle className="text-xl" /> Sign in with Google
                    </button>
                    <p className="mt-6 w-3/4 text-center text-sm text-gray-300">
                        Don't have an account? <Link to="/register" className="text-accent hover:text-accent-light font-medium transition-colors">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}