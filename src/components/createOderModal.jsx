import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function CreateOrderModal(props){
    const [isModalOpen , setIsModalOpen] = useState(false)
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [addressLineOne , setAddressLineOne] = useState("")
    const [addressLineTwo , setAddressLineTwo] = useState("")
    const [city , setCity] = useState("")
    const [state , setState] = useState("")
    const [postalCode , setPostalCode] = useState("")
    const [phone , setPhone] = useState("")

    const cart = props.cart;

    async function createOder(){
        try{

            const token = localStorage.getItem("token")

            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items : []
            }

            for(let i=0; i<cart.length; i++){
                const item = cart[i]
                data.items.push(
                    {
                        productId : item.product.productId,
                        quantity : item.quantity
                    }
                )
            }

            const result = await api.post("/orders" , data , {
                headers : {
                    Authorization : "Bearer " + token
                }
            })
            alert(result.data.message)
            toast.success("Order created successfully!")
            setIsModalOpen(false)

        }catch(error){
            toast.error(error?.response?.data?.message || "An error occurred while creating the order.")
        }
    }

    return(
        <>
        <button className="bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer" onClick={() => setIsModalOpen(true)}>Order now</button>
        {
            isModalOpen &&
            <div className="fixed bg-black/85 backdrop-blur-sm w-screen h-screen top-0 left-0 flex justify-center items-center z-50 p-4 animate-fade-in">
                <div className="w-full max-w-[450px] max-h-[90vh] overflow-y-auto glass-card p-6 flex flex-col gap-4 border border-white/10 shadow-2xl relative text-white custom-scrollbar">
                    <h1 className="text-2xl font-bold text-white text-glow-blue">Shipping Details</h1>
                    
                    <div className="flex flex-col gap-3.5">
                        <input type="text" placeholder="First Name" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="Address Line 1" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                        <input type="text" placeholder="Address Line 2" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                        <input type="text" placeholder="City" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="State" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={state} onChange={(e) => setState(e.target.value)} />
                        <input type="text" placeholder="Postal Code" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        <input type="text" placeholder="Phone" className="glass-input w-full p-2.5 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-sm placeholder-gray-400" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="w-full flex flex-row justify-between items-center mt-3 pt-3 border-t border-white/5">
                        <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer text-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="bg-accent hover:bg-accent-dark hover:shadow-glow-blue text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer text-sm" onClick={createOder}>Place Order</button>
                    </div>
                </div>
            </div>
        }      
        </> 
    )
}