import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { FiBox } from "react-icons/fi";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModel from "../../components/productDeleteModel";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(
        () => {
            document.title = "Manage Products | IONIX Computers";
            if (!isProductsAreLoaded) {
                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setProducts(response.data);
                        setIsProductsAreLoaded(true);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },
        [isProductsAreLoaded]
    );

    return (
        <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 rounded-lg custom-scrollbar-light">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white border border-white/10 shadow-lg flex items-center justify-between px-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl text-white shadow-inner">
                        <FiBox />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-xs text-white/80 mt-0.5">Manage your store product catalog and inventory with ease</p>
                    </div>
                </div>
            </div>

            {
                isProductsAreLoaded ?
                    <div className="w-full overflow-x-auto custom-scrollbar-light rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1200px] text-sm text-gray-700 whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-5 py-4">Image</th>
                                    <th className="text-left px-5 py-4">Product ID</th>
                                    <th className="text-left px-5 py-4">Name</th>
                                    <th className="text-left px-5 py-4">Price</th>
                                    <th className="text-left px-5 py-4">Labelled Price</th>
                                    <th className="text-left px-5 py-4">Brand</th>
                                    <th className="text-left px-5 py-4">Model</th>
                                    <th className="text-left px-5 py-4">Category</th>
                                    <th className="text-left px-5 py-4">Availability</th>
                                    <th className="text-left px-5 py-4">Stock</th>
                                    <th className="text-left px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((item) => {
                                        return (
                                            <tr
                                                key={item.productId}
                                                className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                                            >
                                                <td className="px-5 py-4">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded-xl border border-gray-200 bg-white shadow-sm"
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                        {item.productId}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                                </td>

                                                <td className="px-5 py-4 font-bold text-green-600">
                                                    Rs. {item.price.toLocaleString()}
                                                </td>

                                                <td className="px-5 py-4 text-gray-400 font-medium line-through">
                                                    Rs. {item.labelledPrice.toLocaleString()}
                                                </td>

                                                <td className="px-5 py-4 text-gray-700">
                                                    {item.brand || "-"}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.model || "-"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-semibold">
                                                        {item.category}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${item.isAvailable
                                                                ? "bg-green-50 border border-green-200 text-green-600"
                                                                : "bg-red-50 border border-red-200 text-red-600"
                                                            }`}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                                        {item.isAvailable ? "Available" : "Unavailable"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="font-bold text-gray-800">{item.stock}</span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <ProductDeleteModel
                                                            product={item}
                                                            refresh={() => {
                                                                setIsProductsAreLoaded(false);
                                                            }}
                                                        />
                                                        <Link
                                                            to="/admin/edit-product"
                                                            state={item}
                                                            className="w-9 h-9 rounded-lg border border-blue-100 bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                                        >
                                                            <BiEdit className="text-xl text-blue-600 cursor-pointer" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <LoadingAnimation />
            }

            <Link
                to="/admin/add-product"
                className="fixed bottom-8 right-8 w-[64px] h-[64px] bg-accent flex justify-center items-center text-white text-3xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200"
            >
                <FaPlus />
            </Link>
        </div>
    );
}