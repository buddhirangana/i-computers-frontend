import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import { FaStar, FaRegStar, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchReviews = () => {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/reviews", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                setReviews(response.data);
                setIsLoaded(true);
            }
        ).catch(
            (error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || "Failed to load reviews.");
                setIsLoaded(true);
            }
        );
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleToggleApprove = (id) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_API_URL + `/reviews/${id}/approve`, {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success(response.data.message);
                fetchReviews();
            }
        ).catch(
            (error) => {
                toast.error(error?.response?.data?.message || "Failed to toggle approval status.");
            }
        );
    };

    const handleDeleteReview = (id) => {
        if (!window.confirm("Are you sure you want to delete this review permanently?")) {
            return;
        }

        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_API_URL + `/reviews/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success(response.data.message);
                fetchReviews();
            }
        ).catch(
            (error) => {
                toast.error(error?.response?.data?.message || "Failed to delete review.");
            }
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-amber-400 text-sm inline-block mr-0.5" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300 text-sm inline-block mr-0.5" />);
            }
        }
        return stars;
    };

    const filteredReviews = reviews.filter(review =>
        review.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${review.firstName} ${review.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full overflow-y-scroll bg-gray-50 p-6 rounded-lg">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex lg:flex-row flex-col lg:items-center justify-between px-6 py-4 mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Product Reviews</h1>
                    <p className="text-sm text-gray-500 mt-1">Moderate customer reviews and product ratings</p>
                </div>

                <div className="relative w-full lg:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by product, user or review..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 hover:bg-gray-200 focus:bg-white border border-transparent focus:border-accent rounded-xl text-sm focus:outline-none transition-colors duration-200"
                    />
                </div>
            </div>

            {
                isLoaded ?
                    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1100px] text-sm text-gray-700">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left font-semibold px-5 py-4 w-[15%]">Product ID</th>
                                    <th className="text-left font-semibold px-5 py-4 w-[20%]">Reviewer</th>
                                    <th className="text-left font-semibold px-5 py-4 w-[12%]">Rating</th>
                                    <th className="text-left font-semibold px-5 py-4 w-[28%]">Comment</th>
                                    <th className="text-left font-semibold px-5 py-4 w-[10%]">Date</th>
                                    <th className="text-left font-semibold px-5 py-4 w-[10%]">Status</th>
                                    <th className="text-center font-semibold px-5 py-4 w-[15%]">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredReviews.map((item) => {
                                        const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        });

                                        return (
                                            <tr
                                                key={item._id}
                                                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                        {item.productId}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.image}
                                                            alt={`${item.firstName} ${item.lastName}`}
                                                            className="w-8 h-8 object-cover rounded-full border border-gray-200 bg-gray-100"
                                                            onError={(e) => {
                                                                e.target.src = "/images/default-profile.png";
                                                            }}
                                                        />
                                                        <div className="overflow-hidden">
                                                            <div className="font-semibold text-gray-800 truncate">{item.firstName} {item.lastName}</div>
                                                            <div className="text-xs text-gray-500 truncate">{item.email}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center">
                                                        {renderStars(item.rating)}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-gray-700 whitespace-pre-line max-h-20 overflow-y-auto pr-2">
                                                        {item.comment}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4 text-gray-500 font-medium">
                                                    {formattedDate}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.isApproved
                                                        ? "bg-green-50 text-green-600 border border-green-100"
                                                        : "bg-red-50 text-red-600 border border-red-100"
                                                    }`}>
                                                        {item.isApproved ? "Approved" : "Hidden"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        {/* Toggle Approval Status */}
                                                        <button
                                                            onClick={() => handleToggleApprove(item._id)}
                                                            title={item.isApproved ? "Hide Review" : "Approve Review"}
                                                            className={`p-2 rounded-xl border flex items-center justify-center transition-all ${item.isApproved
                                                                ? "bg-red-50 hover:bg-red-100 border-red-100 text-red-600"
                                                                : "bg-green-50 hover:bg-green-100 border-green-100 text-green-600"
                                                            }`}
                                                        >
                                                            {item.isApproved ? <FaTimes className="text-md" /> : <FaCheck className="text-md" />}
                                                        </button>

                                                        {/* Delete Review */}
                                                        <button
                                                            onClick={() => handleDeleteReview(item._id)}
                                                            title="Delete Review"
                                                            className="p-2 rounded-xl border bg-gray-50 hover:bg-red-50 hover:border-red-100 hover:text-red-600 text-gray-500 border-gray-200 flex items-center justify-center transition-all"
                                                        >
                                                            <FaTrash className="text-md" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                {filteredReviews.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-10 text-gray-500">
                                            No reviews match your search criteria.
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
