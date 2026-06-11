import { useState, useEffect } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { Link } from "react-router-dom"
import { BiShoppingBag } from "react-icons/bi"

export default function CartPage(){
    const [cart , setCart] = useState(getCart())
    
    useEffect(() => {
        document.title = "Your Shopping Cart | IONIX Computers";
    }, []);

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-5 text-center bg-primary text-gray-300">
                <div className="w-28 h-28 rounded-full bg-slate-800/40 border border-slate-700/30 flex items-center justify-center mb-6 shadow-inner">
                    <BiShoppingBag className="text-slate-400 text-5xl" />
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-3">Your cart is empty</h1>
                <p className="text-gray-400 text-sm lg:text-base max-w-[420px] mb-8 leading-relaxed">
                    Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love!
                </p>
                <Link 
                    to="/products" 
                    className="px-8 py-3 bg-[#3b82f6] hover:bg-[#0040a7] text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:shadow-glow-blue cursor-pointer text-base"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return(
        <div className="w-full min-h-full flex flex-col p-5 items-center gap-4 pb-[150px] lg:pb-28 text-gray-300 bg-primary">
            <h1 className="text-3xl font-bold text-white mb-2 text-glow-blue">Your Shopping Cart</h1>
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.product.productId} className="glass-card w-full lg:w-[500px] lg:h-[150px] shadow-2xl flex flex-col lg:flex-row p-2 lg:items-center relative border border-white/8 hover:border-accent/30 transition-all duration-200">
                                    <img className="w-[100px] h-[100px] object-cover rounded-lg bg-white/5" src={item.product.image}/>

                                    <div className="h-full w-full lg:w-[400px] pl-3">
                                        <h2 className="text-lg font-semibold text-white">{item.product.name}</h2>
                                        <p className="text-sm text-gray-400">{item.product.productId}</p>
                                        {
                                            item.product.labelledPrice > item.product.price && <span className="text-sm text-gray-500 mt-2 line-through">{getFormattedPrice(item.product.labelledPrice)}</span>
                                        }
                                        <p className="text-accent-light font-semibold text-sm">
                                            {getFormattedPrice(item.product.price)}
                                        </p>
                                    </div>
                                    <div className="w-[200px] h-full absolute right-2 flex flex-col justify-end items-end p-2">
                                        <div className="w-[100px] h-[30px] border border-white/10 bg-white/5 rounded-full flex items-center justify-between px-3 text-white">
                                            <button className="text-xl font-bold cursor-pointer hover:text-accent-light"
                                                onClick={
                                                    ()=>{
                                                        addToCart(item.product , -1)
                                                        setCart(getCart())
                                                    }
                                                }
                                            >-</button>
                                                <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={
                                                    ()=>{
                                                        addToCart(item.product , 1)
                                                        setCart(getCart())
                                                    }
                                                }
                                             className="text-xl font-bold cursor-pointer hover:text-accent-light">+</button>
                                        </div>
                                        {/* total */}
                                        <p className="text-xl mt-2"><span className="text-accent-light font-semibold">{getFormattedPrice(item.product.price * item.quantity)}</span></p>
                                    </div>                           
                            </div>
                        )
                    }
                )
            }
            <div className="w-full lg:w-[500px] bg-[#0b0f19]/90 backdrop-blur-lg border border-white/10 rounded-t-xl shadow-2xl flex p-4 items-center justify-between fixed bottom-[82px] lg:bottom-0 z-10 text-white">
                <Link to="/checkout" state={cart} className="bg-accent text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-accent-dark hover:shadow-glow-blue transition-all duration-200 cursor-pointer">Checkout</Link>
                <p className="text-xl font-bold ml-4">Total: <span className="text-accent-light">{getFormattedPrice(getCartTotal(cart))}</span></p>
            </div>
        </div>
    )
}