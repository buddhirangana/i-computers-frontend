import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"

export default function ProductCard(props){

    const product = props.product  
    
    return(
        <Link to={"/overview/"+product.productId} state={product} className="w-[300px] h-[450px] m-10 glass-card shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 justify-between cursor-pointer hover:border-accent/40 hover:shadow-glow-blue transition-all duration-300">
            <div className="w-[300px] h-[300px] relative bg-[#0b0f19]/30">
                <img src={product.images[1]} alt={product.productName} className="w-full h-full object-cover absolute top-0 left-0"/>
                <img src={product.images[0]} alt={product.productName} className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500"/>
            </div>
            <h1 className="text-lg font-semibold mt-4 px-4 text-white hover:text-accent transition-colors duration-200 line-clamp-2">{product.name}</h1>
            <div className="w-full flex flex-col py-4">
                {
                    product.labelledPrice > product.price && <span className="text-sm text-gray-500 mt-2 px-4 line-through">{getFormattedPrice(product.labelledPrice)}</span>
                }
                <span className="text-lg font-bold mt-1 px-4 text-accent-light">{getFormattedPrice(product.price)}</span>
            </div>
        </Link>
    )
}