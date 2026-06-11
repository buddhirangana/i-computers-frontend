import { useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation";
import api from "../utils/api";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiEye, FiEyeOff, FiUploadCloud } from "react-icons/fi";

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        document.title = "Profile Settings | IONIX Computers";
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api
                .get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    async function updateProfile() {
        if (!firstName.trim() || !lastName.trim()) {
            toast.error("Please enter both first and last name.");
            return;
        }

        setIsUpdatingProfile(true);
        const token = localStorage.getItem("token");
        let image = user.image;
        try {
            if (imageFile) {
                image = await uploadMedia(imageFile);
            }

            const response = await api.put("/users/", {
                firstName: firstName,
                lastName: lastName,
                image: image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.setItem("token", response.data.token);
            toast.success("Profile updated successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload image");
            setIsUpdatingProfile(false);
            return;
        }
    }

    async function updatePassword() {
        if (!password.trim() || !confirmPassword.trim()) {
            toast.error("Please enter a new password and confirm it.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsUpdatingPassword(true);
        const token = localStorage.getItem("token");
        try {
            await api.put("/users/password", {
                newPassword: password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Password updated successfully");
            setPassword("");
            setConfirmPassword("");
            window.location = "/login";
        } catch (error) {
            console.log(error);
            toast.error("Failed to update password");
        }
        setIsUpdatingPassword(false);
    }

    return (
        <div className="w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-20 px-6 pb-[150px] lg:pb-28">
            {/* Background Mesh Overlay & Glowing Spotlights */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                {user ? (
                    <>
                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-12">
                            <span className="text-xs font-bold text-accent-light uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">Account Center</span>
                            <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">Profile Settings</h1>
                            <p className="text-xs text-gray-500 mt-2 font-light">{user.email}</p>
                        </div>

                        {/* Split Forms Grid */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            
                            {/* Card 1: Basic Information */}
                            <div className="glass-card p-6 sm:p-8 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col justify-between h-full min-h-[460px]">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-3">Basic Information</h2>
                                    
                                    {/* Circular Avatar Upload Panel */}
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="relative group w-24 h-24 rounded-full overflow-hidden border border-white/10 hover:border-accent transition-all duration-300 shadow-md">
                                            <img 
                                                src={user.image || "https://www.w3schools.com/howto/img_avatar.png"} 
                                                alt="User Avatar"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                            />
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center cursor-pointer text-[9px] text-white font-bold gap-1">
                                                <FiUploadCloud className="text-base" />
                                                <span>Upload</span>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImageFile(e.target.files[0])}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                            </label>
                                        </div>
                                        {imageFile && (
                                            <span className="text-[10px] text-accent-light font-bold mt-2 text-center max-w-[200px] truncate">
                                                Selected: {imageFile.name}
                                            </span>
                                        )}
                                    </div>

                                    {/* First Name Input */}
                                    <div className="w-full flex flex-col gap-2 mb-4">
                                        <label className="text-xs font-semibold text-gray-400 tracking-wider">First Name</label>
                                        <div className="relative flex items-center">
                                            <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                            <input
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name Input */}
                                    <div className="w-full flex flex-col gap-2 mb-6">
                                        <label className="text-xs font-semibold text-gray-400 tracking-wider">Last Name</label>
                                        <div className="relative flex items-center">
                                            <FiUser className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                            <input
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={updateProfile} 
                                    className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider uppercase" 
                                    disabled={isUpdatingProfile}
                                >
                                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                                </button>
                            </div>

                            {/* Card 2: Change Password */}
                            <div className="glass-card p-6 sm:p-8 border border-white/8 backdrop-blur-md shadow-2xl flex flex-col justify-between h-full min-h-[460px]">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-3">Change Password</h2>
                                    
                                    <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light">
                                        Keep your account secure by modifying your password regularly. After changing it, you will be redirected to the sign-in screen.
                                    </p>

                                    {/* New Password Input */}
                                    <div className="w-full flex flex-col gap-2 mb-5">
                                        <label className="text-xs font-semibold text-gray-400 tracking-wider">New Password</label>
                                        <div className="relative flex items-center">
                                            <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                                placeholder="••••••••"
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
                                        <label className="text-xs font-semibold text-gray-400 tracking-wider">Confirm Password</label>
                                        <div className="relative flex items-center">
                                            <FiLock className="absolute left-4 text-gray-500 text-lg pointer-events-none" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full pl-11 pr-12 py-3 rounded-xl glass-input border border-white/8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-base md:text-sm"
                                                placeholder="••••••••"
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
                                </div>

                                <button 
                                    onClick={updatePassword} 
                                    disabled={isUpdatingPassword} 
                                    className="w-full py-3.5 bg-accent hover:bg-accent-dark hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] text-white font-bold rounded-xl transition-all duration-300 cursor-pointer text-base md:text-sm tracking-wider uppercase"
                                >
                                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                                </button>
                            </div>

                        </div>
                    </>
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        </div>
    );
}
