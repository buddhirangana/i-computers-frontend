import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import toast from "react-hot-toast";
import api from "../utils/api";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState(["All Products"]);
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [sortBy, setSortBy] = useState("Newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    
    const sortDropdownRef = useRef(null);

    // Set page title
    useEffect(() => {
        document.title = "Products Catalog | IONIX Computers";
    }, []);

    // Fetch all categories once on mount
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => {
                const uniqueCats = [...new Set(response.data.map(p => p.category).filter(Boolean))];
                setAllCategories(["All Products", ...uniqueCats]);
            })
            .catch((error) => {
                console.log("Error loading categories:", error);
            });
    }, []);

    // Load products based on URL search query
    useEffect(() => {
        setQuery(searchQuery);

        if (searchQuery.trim()) {
            api.get("/products/search/" + encodeURIComponent(searchQuery.trim()))
                .then((response) => {
                    setAllProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to search products!");
                });
        } else {
            axios.get(import.meta.env.VITE_API_URL + "/products")
                .then((response) => {
                    setAllProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [searchQuery]);

    // Handle Category Filtering & Sorting
    useEffect(() => {
        let list = [...allProducts];

        // 1. Category Filter
        if (selectedCategory !== "All Products") {
            list = list.filter(p => p.category === selectedCategory);
        }

        // 2. Sort Logic
        if (sortBy === "Price, Low to High") {
            list.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "Price, High to Low") {
            list.sort((a, b) => Number(b.price) - Number(a.price));
        } else {
            // "Newest" - Sort by productId descending
            list.sort((a, b) => b.productId.localeCompare(a.productId));
        }

        setFilteredProducts(list);
    }, [allProducts, selectedCategory, sortBy]);

    // Click outside handler for sort dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        if (isSortOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSortOpen]);

    function handleSearch() {
        if (query.trim()) {
            setSearchParams({ search: query.trim() });
        } else {
            setSearchParams({});
        }
    }

    return (
        <div className="w-full min-h-full flex flex-col p-6 items-center gap-6 pb-[150px] lg:pb-28 text-gray-300 bg-primary">
            <h1 className="sr-only">Products Catalog | I Computers</h1>
            
            {/* Search Section */}
            <div className="w-full flex justify-center items-center gap-4 max-w-4xl mx-auto mt-4">
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
                    className="flex-1 max-w-lg p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                />
                <button 
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark shadow-md hover:shadow-glow-blue focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 cursor-pointer font-semibold" 
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* Controls Section (Categories & Sorting) */}
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-4 border-b border-white/5 pb-4">
                {/* Categories Pill list */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                                selectedCategory === cat
                                    ? "bg-white text-slate-900 shadow-glow-blue border-none"
                                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 relative z-20" ref={sortDropdownRef}>
                    <span className="text-sm text-gray-400 font-medium">Sort by:</span>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-white/10 cursor-pointer transition-all duration-200"
                    >
                        {sortBy}
                        {isSortOpen ? <BiChevronUp className="text-lg" /> : <BiChevronDown className="text-lg" />}
                    </button>

                    {isSortOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-gradient-to-b from-white/95 to-white border border-white/20 shadow-2xl p-1.5 origin-top-right">
                            {["Newest", "Price, Low to High", "Price, High to Low"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setSortBy(option);
                                        setIsSortOpen(false);
                                    }}
                                    className={`flex w-full px-4 py-2 text-sm text-left rounded-lg transition-colors duration-150 cursor-pointer font-bold ${
                                        sortBy === option
                                            ? "bg-accent/15 text-accent font-bold"
                                            : "text-slate-700 hover:bg-slate-100 hover:text-accent"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-6 mt-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCard key={item.productId} product={item} />
                    ))
                ) : (
                    <div className="w-full text-center py-16 text-gray-400 font-medium">
                        No products found matching your filter criteria.
                    </div>
                )}
            </div>
        </div>
    );
}