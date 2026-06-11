import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"

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

    return(
        <Link to={"/overview/"+product.productId} state={product} className="w-[300px] h-[480px] m-10 glass-card shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 justify-between cursor-pointer hover:border-accent/40 hover:shadow-glow-blue transition-all duration-300">
            <div className="w-[300px] h-[300px] relative bg-[#0b0f19]/30">
                <img src={product.images[1]} alt={product.name} className="w-full h-full object-cover absolute top-0 left-0"/>
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500"/>
                
                {/* Stock Status Badge */}
                {isOutOfStock ? (
                    <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
                        Out of Stock
                    </span>
                ) : (
                    <span className="absolute top-3 left-3 bg-green-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
                        In Stock
                    </span>
                )}
            </div>
            
            <h1 className="text-base font-semibold mt-3 px-4 text-white hover:text-accent transition-colors duration-200 line-clamp-2">{product.name}</h1>
            
            <div className="w-full flex flex-col px-4 pb-4">
                <div className="flex flex-col mb-3">
                    {
                        product.labelledPrice > product.price && <span className="text-xs text-gray-500 line-through">{getFormattedPrice(product.labelledPrice)}</span>
                    }
                    <span className="text-base font-bold text-accent-light">{getFormattedPrice(product.price)}</span>
                </div>
                
                {isOutOfStock ? (
                    <div className="w-full py-2 bg-white/5 border border-white/10 text-white text-center font-semibold rounded-lg text-sm hover:bg-white/10 transition-all duration-200">
                        View Product
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg text-sm transition-all duration-200 hover:shadow-glow-blue cursor-pointer"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </Link>
    )
}