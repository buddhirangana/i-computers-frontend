import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../components/loadingAnimation"
import ImageSlideShow from "../components/imageSlidesShow"
import getFormattedPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"
import { FaStar, FaRegStar } from "react-icons/fa"

export default function ProductOverviewPage(){
    const parameters = useParams()
    const [product , setProduct] = useState(null)
    const [status , setStatus] = useState("loading")// loading , success , error
    
    const [reviews, setReviews] = useState([])
    const [newRating, setNewRating] = useState(5)
    const [newComment, setNewComment] = useState("")
    const [isSubmittingReview, setIsSubmittingReview] = useState(false)

    const fetchReviews = () => {
        api.get("/reviews/product/" + parameters.productId).then(
            (response) => {
                setReviews(response.data)
            }
        ).catch(
            (error) => {
                console.error("Error fetching reviews:", error)
            }
        )
    }
    
    useEffect(
        ()=>{
            api.get("/products/"+parameters.productId).then(
                (response)=>{
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (error)=>{
                    toast.error(error?.response?.data?.message || "An error occurred while fetching product details.")
                    setStatus("error")
                }
            )

            fetchReviews()
        }
        ,[parameters.productId]
    )

    const handleSubmitReview = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("You must be logged in to post a review.")
            return
        }

        if (!newComment.trim()) {
            toast.error("Please enter a comment.")
            return
        }

        setIsSubmittingReview(true)
        api.post("/reviews", {
            productId: parameters.productId,
            rating: newRating,
            comment: newComment
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success("Review submitted successfully!")
                setNewComment("")
                setNewRating(5)
                fetchReviews()
                setIsSubmittingReview(false)
            }
        ).catch(
            (error) => {
                toast.error(error?.response?.data?.message || "Failed to submit review.")
                setIsSubmittingReview(false)
            }
        )
    }

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
        : 0


    

    return(
        <div className="w-full min-h-full bg-white flex flex-col">
            {
                status == "loading" && (
                    <div className="w-full min-h-[400px] flex justify-center items-center">
                        <LoadingAnimation/>
                    </div>
                )
            }
            {
                status == "error" && (
                    <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Failed to load product details.</h1>
                        <Link to="/products" className="px-5 py-2.5 bg-accent text-white rounded-xl shadow font-semibold hover:opacity-90 transition-opacity">Back to Products</Link>
                    </div>
                )
            }
            {
                status == "success" && <div className="w-full flex flex-col">
                    {/* Product Main Info */}
                    <div className="w-full flex lg:flex-row flex-col">
                        <div className="w-full lg:w-1/2 flex justify-center items-center py-6">
                            <ImageSlideShow images={product.images}/>
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col p-6">

                            <h1 className="text-3xl font-bold text-gray-800">{product.name}
                                {
                                    product.altNames.map(
                                        (alterantiveName , index) => {
                                            return(
                                                <span key={index} className=" text-gray-500 "> | {alterantiveName}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            <h2 className="text-sm text-gray-500 mt-5">{product.productId}</h2>
                            <div className="w-full mt-5 flex flex-col">
                                <p className="text-accent font-semibold text-4xl">
                                    {
                                        getFormattedPrice(product.price)
                                    }
                                    
                                </p>
                                {
                                    product.labelledPrice > product.price &&
                                    <span className="text-xl text-gray-500 line-through ">
                                        {
                                            getFormattedPrice(product.labelledPrice)
                                        }
                                    </span>
                                }
                            </div>
                            {/* brand and model */}
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.brand}</span></span>
                                <span className="text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.model}</span></span>
                            </div>
                            {/* category */}
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.category}</span></span>
                            </div>
                            <p className="text-lg mt-5 mb-8 text-gray-700">
                                {
                                    product.description
                                }
                            </p>
                            <div className="flex mt-5 gap-5 fixed lg:static bottom-[82px] right-0 p-2 backdrop-blur-2xl lg:backdrop-blur-none w-full z-10 bg-white/70 lg:bg-transparent">                                
                                <button className="w-62.5 h-16 bg-green-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300" onClick={
                                    ()=>{
                                        addToCart(product , 1)
                                        toast.success("Product added to cart")
                                    }
                                }>Add to Cart</button>
                                <Link
                                    to="/checkout"
                                    state={
                                        [
                                           { 
                                                product : {
                                                    productId : product.productId,
                                                    name : product.name,
                                                    image : product.images[0],
                                                    labelledPrice : product.labelledPrice,
                                                    price : product.price,
                                                },
                                                quantity : 1
                                            }
                                        ]
                                    }
                                className="w-62.5 h-16 bg-blue-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center">Buy Now</Link>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="w-full border-t border-gray-200 mt-12 px-6 py-10 pb-36 bg-gray-50 flex flex-col items-center">
                        <div className="w-full max-w-5xl">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>

                            {/* Rating Summary Block */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                                <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
                                    <span className="text-5xl font-extrabold text-gray-800">{averageRating}</span>
                                    <div className="flex mt-2 mb-1">
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const starVal = i + 1;
                                            return starVal <= Math.round(averageRating) ? (
                                                <FaStar key={i} className="text-amber-400 text-xl" />
                                            ) : (
                                                <FaRegStar key={i} className="text-gray-300 text-xl" />
                                            );
                                        })}
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">({reviews.length} customer reviews)</span>
                                </div>

                                <div className="col-span-2 flex flex-col justify-center px-0 md:px-4">
                                    {Array.from({ length: 5 }).reverse().map((starNum) => {
                                        const count = reviews.filter(r => r.rating === starNum).length;
                                        const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                                        return (
                                            <div key={starNum} className="flex items-center text-sm mb-1.5 last:mb-0">
                                                <span className="w-3 text-gray-600 font-medium">{starNum}</span>
                                                <FaStar className="text-amber-400 text-xs mx-1.5" />
                                                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                                                </div>
                                                <span className="w-8 text-right text-gray-500 text-xs font-semibold pl-2">{Math.round(pct)}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Grid for writing review and review list */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                {/* Left Side: Write a Review Form */}
                                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-28">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Write a Review</h4>
                                    
                                    {localStorage.getItem("token") ? (
                                        <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                                                <div className="flex gap-2">
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        const starVal = i + 1;
                                                        return (
                                                            <button
                                                                key={i}
                                                                type="button"
                                                                onClick={() => setNewRating(starVal)}
                                                                className="cursor-pointer focus:outline-none transition-transform hover:scale-110 duration-150"
                                                            >
                                                                {starVal <= newRating ? (
                                                                    <FaStar className="text-amber-400 text-3xl" />
                                                                ) : (
                                                                    <FaRegStar className="text-gray-300 text-3xl" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="comment-input" className="block text-sm font-semibold text-gray-700 mb-2">Review Comment</label>
                                                <textarea
                                                    id="comment-input"
                                                    rows="4"
                                                    placeholder="Describe your purchase experience, product performance, etc..."
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    className="w-full border border-gray-200 hover:border-gray-300 focus:border-accent p-3 rounded-xl text-sm focus:outline-none transition-colors duration-200 resize-none"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmittingReview}
                                                className="w-full py-3 bg-accent text-white font-semibold rounded-xl text-sm shadow hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:opacity-50"
                                            >
                                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="text-center py-6">
                                            <p className="text-sm text-gray-500 mb-4">Please log in to your account to leave a product review.</p>
                                            <Link
                                                to="/login"
                                                className="inline-block px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity duration-200"
                                            >
                                                Log In
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Reviews List */}
                                <div className="lg:col-span-2 flex flex-col gap-4">
                                    <h4 className="text-lg font-bold text-gray-800">Reviews ({reviews.length})</h4>
                                    
                                    {reviews.length > 0 ? (
                                        reviews.map((rev) => {
                                            const formattedRevDate = new Date(rev.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            });

                                            return (
                                                <div key={rev._id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex gap-4">
                                                    <img
                                                        src={rev.image}
                                                        alt={`${rev.firstName} ${rev.lastName}`}
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-100 bg-gray-50"
                                                        onError={(e) => {
                                                            e.target.src = "/images/default-profile.png";
                                                        }}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between flex-wrap gap-1">
                                                            <span className="font-semibold text-gray-800 text-sm">{rev.firstName} {rev.lastName}</span>
                                                            <span className="text-xs text-gray-400 font-medium">{formattedRevDate}</span>
                                                        </div>
                                                        
                                                        <div className="flex mt-1 mb-2">
                                                            {Array.from({ length: 5 }).map((_, i) => {
                                                                const starVal = i + 1;
                                                                return starVal <= rev.rating ? (
                                                                    <FaStar key={i} className="text-amber-400 text-xs" />
                                                                ) : (
                                                                    <FaRegStar key={i} className="text-gray-300 text-xs" />
                                                                );
                                                            })}
                                                        </div>

                                                        <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                                                            {rev.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="bg-white py-12 px-6 text-center border border-gray-150 rounded-2xl shadow-sm">
                                            <p className="text-gray-500 text-sm">No reviews yet for this product. Be the first to write one!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}