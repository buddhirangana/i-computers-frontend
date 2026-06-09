import { useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation";
import api from "../utils/api";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    useEffect(() => {
        document.title = "Profile Settings | iComputers";
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
        setIsUpdatingProfile(true)
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
            })

            localStorage.setItem("token", response.data.token)

            toast.success("Profile updated successfully")

            window.location.reload()
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload image");
            setIsUpdatingProfile(false)
            return;
        }
    }

    async function updatePassword() {
        setIsUpdatingPassword(true)
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        const token = localStorage.getItem("token");
        try {
            await api.put("/users/password", {
                newPassword: password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Password updated successfully")
            setPassword("")
            setConfirmPassword("")
            window.location = "/login"
        } catch (error) {
            console.log(error)
            toast.error("Failed to update password")

        }
        setIsUpdatingPassword(false)
    }

    return (
        <div className="w-full min-h-full flex flex-col items-center justify-center py-12 px-6 gap-6 bg-primary pb-[150px] lg:pb-28 text-gray-300">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold text-white text-glow-blue">Profile Settings</h1>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-[400px] h-[400px] glass-card p-6 border border-white/8 shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-semibold">First Name</label>
                                    <input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full p-2 bg-white/5 border border-white/10 text-white rounded focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-semibold">Last Name</label>
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full p-2 bg-white/5 border border-white/10 text-white rounded focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-semibold">Profile Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                        className="w-full p-2 bg-white/5 border border-white/10 text-white rounded focus:border-accent focus:outline-none transition-all duration-200 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark cursor-pointer text-xs"
                                    />
                                </div>
                            </div>
                            <button onClick={updateProfile} className="px-4 py-2 bg-accent hover:bg-accent-dark shadow hover:shadow-glow-blue text-white rounded font-semibold cursor-pointer w-full transition-all duration-200" disabled={isUpdatingProfile}>
                                {isUpdatingProfile ? "Updating..." : "Update Profile"}
                            </button>
                        </div>

                        <div className="w-[400px] h-[400px] glass-card p-6 border border-white/8 shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-semibold">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 bg-white/5 border border-white/10 text-white rounded focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-semibold">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-2 bg-white/5 border border-white/10 text-white rounded focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <button onClick={updatePassword} disabled={isUpdatingPassword} className="px-4 py-2 bg-accent hover:bg-accent-dark shadow hover:shadow-glow-blue text-white rounded font-semibold cursor-pointer w-full transition-all duration-200">
                                {isUpdatingPassword ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
}
