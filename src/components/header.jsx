import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[100px] glass-nav sticky top-0 z-50 flex items-center justify-center shrink-0 shadow-lg">
            <Link to="/" className="lg:w-[200px] h-full absolute lg:left-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className="h-[60px] mr-2 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"/>
            </Link>
            <div className="h-full hidden lg:flex justify-center items-center gap-10">
                <Link to="/" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Products</Link>
                <Link to="/about-us" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">About Us</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold hover:text-accent transition-colors duration-200">Contact Us</Link>
            </div>
            <div className="h-[50px] hidden lg:flex absolute right-30 justify-center items-center">
                <UserData/>
            </div>
            <Link to="/cart" className="w-[50px] h-[50px] absolute right-10 hidden lg:flex justify-center items-center hover:text-accent transition-colors duration-200">
                <BiCart className="text-white hover:text-accent text-3xl transition-colors duration-200"/>
            </Link>
        </header>
    )
}