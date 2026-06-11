import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const [query , setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        document.title = "Products Catalog | IONIX Computers";
    }, []);

    useEffect(() => {
        // Sync the query input text state with URL search param
        setQuery(searchQuery);

        if (searchQuery.trim()) {
            api.get("/products/search/" + encodeURIComponent(searchQuery.trim()))
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to search products!");
                });
        } else {
            axios.get(import.meta.env.VITE_API_URL + "/products")
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [searchQuery]);

    function handleSearch(){
        if (query.trim()) {
            setSearchParams({ search: query.trim() });
        } else {
            setSearchParams({});
        }
    }

    return(
        <div className="w-full h-full flex justify-center flex-wrap lg:pb-0 pt-16 relative">
            <h1 className="sr-only">Products Catalog | I Computers</h1>
            <div className="full absolute top-0 left-0 w-full h-[100px] flex justify-center items-center">
                <input 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    type="text" 
                    placeholder="Search products..." 
                    className="w-1/2 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                />
                <button 
                    className="ml-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark shadow-md hover:shadow-glow-blue focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 cursor-pointer font-semibold" 
                    onClick={handleSearch}
                >
                    Search
                </button>
                <button 
                    className="ml-4 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 cursor-pointer font-semibold" 
                    onClick={() => { 
                        setSearchParams({});
                        setQuery("");
                    }}
                >
                    All Products
                </button>
            </div>
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard key={item.productId} product={item}/>
                        )
                    }
                )
            }
            <div className="w-full h-[150px]"></div>
        </div>
    )
}