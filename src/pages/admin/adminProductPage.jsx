import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function AdminProductPage() {
    return (
        <div className="w-full h-full">
            <Link to="/admin/add-product" className="fixed bottom-6 right-8 w-[60px] h-[60px] bg-accent hover:text-accent hover:bg-black flex justify-center items-center text-white text-3xl rounded-full shadow-2xl">
                <FaPlus />
            </Link>
        </div>
    )
}