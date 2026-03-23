import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


const sampleProducts = [
    {
        productId: "P1001",
        name: "Dell Inspiron 15 3520 Laptop",
        altNames: ["Dell i5 Laptop", "Inspiron 15"],
        price: 185000,
        labelledPrice: 199000,
        description: "15.6-inch FHD laptop powered by Intel Core i5 12th Gen, 8GB RAM, 512GB SSD.",
        images: [
            "https://m.media-amazon.com/images/I/61s0g8z7JEL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71Zf9uUp+GL._AC_SL1500_.jpg"
        ],
        brand: "Dell",
        model: "Inspiron 15 3520",
        category: "Laptop",
        isAvailable: true,
        stock: 12
    },
    {
        productId: "P1002",
        name: "HP Pavilion Gaming Desktop TG01",
        altNames: ["HP Gaming PC", "Pavilion TG01"],
        price: 245000,
        labelledPrice: 260000,
        description: "Gaming desktop with AMD Ryzen 5, 16GB RAM, 512GB SSD, NVIDIA GTX graphics.",
        images: [
            "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61C5l6J5QkL._AC_SL1500_.jpg"
        ],
        brand: "HP",
        model: "TG01",
        category: "Desktop",
        isAvailable: true,
        stock: 8
    },
    {
        productId: "P1003",
        name: "ASUS TUF Gaming F15 FX506 Laptop",
        altNames: ["ASUS Gaming Laptop", "TUF F15"],
        price: 320000,
        labelledPrice: 345000,
        description: "High-performance gaming laptop with Intel i7, RTX 3050, 16GB RAM.",
        images: [
            "https://m.media-amazon.com/images/I/81fP1h1P7PL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71rN9F7k7DL._AC_SL1500_.jpg"
        ],
        brand: "ASUS",
        model: "FX506",
        category: "Laptop",
        isAvailable: true,
        stock: 5
    },
    {
        productId: "P1004",
        name: "Logitech G502 HERO Gaming Mouse",
        altNames: ["G502 Mouse", "Logitech Gaming Mouse"],
        price: 14500,
        labelledPrice: 16500,
        description: "High precision gaming mouse with HERO sensor and customizable RGB lighting.",
        images: [
            "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71WkDp--uqL._AC_SL1500_.jpg"
        ],
        brand: "Logitech",
        model: "G502 HERO",
        category: "Accessories",
        isAvailable: true,
        stock: 25
    },
    {
        productId: "P1005",
        name: "Samsung 24-inch Curved Monitor LC24F390",
        altNames: ["Samsung Monitor", "24 Curved Display"],
        price: 52000,
        labelledPrice: 58000,
        description: "24-inch Full HD curved monitor with HDMI and VGA support.",
        images: [
            "https://m.media-amazon.com/images/I/71QW6R9P7KL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SL1500_.jpg"
        ],
        brand: "Samsung",
        model: "LC24F390",
        category: "Monitor",
        isAvailable: true,
        stock: 15
    }
];

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            //backend api
            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(
                (response) => {
                    setProducts(response.data);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        }, []
    );

    return (
        <div className="w-full h-full">
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Labelled Price</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.productId}>
                            <td><img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover" /></td>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.labelledPrice}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.category}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/admin/add-product" className="fixed bottom-6 right-8 w-15 h-15 bg-accent hover:text-accent hover:bg-black flex justify-center items-center text-white text-3xl rounded-full shadow-2xl">
                <FaPlus />
            </Link>
        </div>
    );
}