import { useState, useEffect } from "react"
import { getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { useLocation } from "react-router-dom"
import CreateOrderModal from "../components/createOderModal"

export default function CheckoutPage(){
    const location = useLocation()
    const [cart , setCart] = useState(location.state)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    useEffect(() => {
        document.title = "Checkout | iComputers";
    }, []);

    return(
        <div className="w-full min-h-full flex flex-col p-5 pb-[150px] lg:pb-28 items-center gap-4 text-gray-300 bg-primary">
            <h1 className="text-3xl font-bold text-white mb-2 text-glow-blue">Checkout Details</h1>
            {
                cart.map(
                    (item , index)=>{
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
                                                        const newCart = [...cart]
                                                        newCart[index].quantity -= 1
                                                        if(newCart[index].quantity <= 0){
                                                            newCart.splice(index , 1)
                                                        }
                                                        setCart(newCart)
                                                    }
                                                }
                                            >-</button>
                                                <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={
                                                    ()=>{
                                                        const newCart = [...cart]
                                                        newCart[index].quantity += 1
                                                        setCart(newCart)
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
            <div className="fixed bottom-[95px] lg:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] bg-[#0b0f19]/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex p-4 items-center justify-between z-40 text-white hover:border-accent/30 transition-all duration-300">
                <button className="bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer text-sm" onClick={() => setIsModalOpen(true)}>Order now</button>
                <p className="text-xl font-bold ml-4">Total: <span className="text-accent-light">{getFormattedPrice(getCartTotal(cart))}</span></p>
            </div>
            <CreateOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cart={cart}/>
        </div>
    )
}