import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import { FaUserShield, FaUserSlash, FaUserCheck, FaSearch } from "react-icons/fa";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchUsers = () => {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/users", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                setUsers(response.data);
                setIsLoaded(true);
            }
        ).catch(
            (error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || "Failed to load users.");
                setIsLoaded(true);
            }
        );
    };

    useEffect(() => {
        document.title = "Manage Users | iComputers";
        fetchUsers();
    }, []);

    const handleToggleBlock = (email) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_API_URL + `/users/${email}/block`, {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success(response.data.message);
                fetchUsers();
            }
        ).catch(
            (error) => {
                toast.error(error?.response?.data?.message || "Failed to update block status.");
            }
        );
    };

    const handleToggleRole = (email) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_API_URL + `/users/${email}/role`, {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success(response.data.message);
                fetchUsers();
            }
        ).catch(
            (error) => {
                toast.error(error?.response?.data?.message || "Failed to update user role.");
            }
        );
    };

    const filteredUsers = users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full overflow-y-scroll bg-gray-50 p-6 rounded-lg">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex lg:flex-row flex-col lg:items-center justify-between px-6 py-4 mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">User Accounts</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage registration roles and access controls</p>
                </div>
                
                <div className="relative w-full lg:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400" />
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 hover:bg-gray-200 focus:bg-white border border-transparent focus:border-accent rounded-xl text-sm focus:outline-none transition-colors duration-200"
                    />
                </div>
            </div>

            {
                isLoaded ?
                    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1000px] text-sm text-gray-700">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left font-semibold px-5 py-4">User</th>
                                    <th className="text-left font-semibold px-5 py-4">Email Address</th>
                                    <th className="text-left font-semibold px-5 py-4">Role</th>
                                    <th className="text-left font-semibold px-5 py-4">Status</th>
                                    <th className="text-left font-semibold px-5 py-4">Email Verification</th>
                                    <th className="text-center font-semibold px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredUsers.map((item) => {
                                        return (
                                            <tr
                                                key={item.email}
                                                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.image.startsWith("/") ? item.image : item.image}
                                                            alt={`${item.firstName} ${item.lastName}`}
                                                            referrerPolicy="no-referrer"
                                                            className="w-10 h-10 object-cover rounded-full border border-gray-200 bg-gray-100"
                                                            onError={(e) => {
                                                                e.target.src = "/images/default-profile.png";
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-gray-800">{item.firstName} {item.lastName}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 font-mono text-gray-600">
                                                    {item.email}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.isAdmin
                                                        ? "bg-purple-50 text-purple-600 border border-purple-100"
                                                        : "bg-blue-50 text-blue-600 border border-blue-100"
                                                    }`}>
                                                        {item.isAdmin ? "Admin" : "Customer"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${!item.isBlocked
                                                        ? "bg-green-50 text-green-600 border border-green-100"
                                                        : "bg-red-50 text-red-600 border border-red-100"
                                                    }`}>
                                                        {item.isBlocked ? "Blocked" : "Active"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.isEmailVerified
                                                        ? "bg-teal-50 text-teal-600 border border-teal-100"
                                                        : "bg-amber-50 text-amber-600 border border-amber-100"
                                                    }`}>
                                                        {item.isEmailVerified ? "Verified" : "Pending"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        {/* Toggle Admin Role */}
                                                        <button
                                                            onClick={() => handleToggleRole(item.email)}
                                                            title={item.isAdmin ? "Demote to Customer" : "Promote to Admin"}
                                                            className={`p-2 rounded-xl border flex items-center justify-center transition-all ${item.isAdmin 
                                                                ? "bg-purple-50 hover:bg-purple-100 border-purple-100 text-purple-600" 
                                                                : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-500"
                                                            }`}
                                                        >
                                                            <FaUserShield className="text-lg" />
                                                        </button>

                                                        {/* Toggle Block Status */}
                                                        <button
                                                            onClick={() => handleToggleBlock(item.email)}
                                                            title={item.isBlocked ? "Unblock Account" : "Block Account"}
                                                            className={`p-2 rounded-xl border flex items-center justify-center transition-all ${item.isBlocked
                                                                ? "bg-green-50 hover:bg-green-100 border-green-100 text-green-600"
                                                                : "bg-red-50 hover:bg-red-100 border-red-100 text-red-600"
                                                            }`}
                                                        >
                                                            {item.isBlocked ? <FaUserCheck className="text-lg" /> : <FaUserSlash className="text-lg" />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-500">
                                            No users match your search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    :
                    <LoadingAnimation />
            }
        </div>
    );
}
