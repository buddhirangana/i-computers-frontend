import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi"

export default function ProductCard(props){
    const product = props.product
    
    // Check if the product is out of stock
    const isOutOfStock = product.stock <= 0 || !product.isAvailable;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast.success(`${product.name} added to wishlist!`);
    };

    // Calculate saving percentage if there is a discount
    const discountPercent = product.labelledPrice > product.price
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return(
        <Link 
            to={"/overview/"+product.productId} 
            state={product} 
            className="group w-full max-w-[280px] sm:max-w-[300px] h-[465px] m-3 sm:m-4 rounded-2xl glass-card overflow-hidden flex flex-col justify-between cursor-pointer border border-white/5 hover:border-accent/30 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
        >
            {/* Image Section */}
            <div className="w-full h-[240px] relative overflow-hidden bg-[#0b0f19]/30 flex items-center justify-center border-b border-white/5 p-4 shrink-0">
                {/* Radial ambient glow behind the product image */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                
                {/* Product Images with Hover Swap and zoom transitions */}
                {product.images && product.images.length > 1 ? (
                    <>
                        <img 
                            src={product.images[1]} 
                            alt={product.name} 
                            className="w-full h-full object-contain p-2 absolute transition-all duration-700 ease-out scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                        />
                        <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-contain p-2 absolute transition-all duration-700 ease-out scale-100 opacity-100 group-hover:opacity-0 group-hover:scale-95 primary-image"
                        />
                    </>
                ) : (
                    <img 
                        src={product.images && product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                )}
                
                {/* Stock Status Badge */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                    {isOutOfStock ? (
                        <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-md shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Out of Stock
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-md shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            In Stock
                        </span>
                    )}
                </div>

                {/* Floating Discount & Wishlist icons */}
                <div className="absolute top-3.5 right-3.5 flex flex-col items-end gap-2.5 z-10">
                    {discountPercent > 0 && (
                        <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                            SAVE {discountPercent}%
                        </span>
                    )}
                    
                    <button 
                        onClick={handleAddToWishlist}
                        className="p-2 bg-white/5 border border-white/10 hover:border-accent-light/40 hover:bg-accent/15 text-gray-400 hover:text-white rounded-xl backdrop-blur-md shadow-md transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Add to Wishlist"
                    >
                        <FiHeart className="text-xs" />
                    </button>
                </div>
            </div>
            
            {/* Details Section */}
            <div className="flex-grow flex flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-col gap-1">
                    {/* Brand and Category line */}
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-gray-500">{product.brand || "IONIX"}</span>
                        <span className="text-accent-light bg-accent/5 px-2 py-0.5 rounded border border-accent/10 text-[9px]">
                            {product.category || "Components"}
                        </span>
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="text-[13px] sm:text-sm font-semibold text-white group-hover:text-accent-light transition-colors duration-300 line-clamp-2 min-h-[38px] leading-snug mt-1">
                        {product.name}
                    </h3>
                </div>
                
                {/* Price and Add-to-Cart Row */}
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-black text-white font-mono">
                            {getFormattedPrice(product.price)}
                        </span>
                        {discountPercent > 0 && (
                            <span className="text-xs text-gray-500 line-through font-semibold font-mono">
                                {getFormattedPrice(product.labelledPrice)}
                            </span>
                        )}
                    </div>
                    
                    {isOutOfStock ? (
                        <div className="w-full py-2.5 bg-white/5 border border-white/10 text-white text-center font-semibold rounded-xl text-xs hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5">
                            <FiEye className="text-sm" />
                            View Product
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer flex items-center justify-center gap-1.5"
                        >
                            <FiShoppingCart className="text-sm" />
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </Link>
    )
}