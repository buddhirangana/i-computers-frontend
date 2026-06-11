import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import toast from "react-hot-toast";
import api from "../utils/api";
import { BiChevronDown, BiChevronUp, BiSearch, BiShoppingBag } from "react-icons/bi";

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
            
            {/* Catalog Header Title */}
            <div className="w-full text-center flex flex-col items-center gap-3 mt-6">
                <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    Explore Our Catalog
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-lg">
                    Discover state-of-the-art computer systems, high-performance components, and gaming accessories.
                </p>
            </div>

            {/* Premium Glassmorphic Search Bar Container */}
            <div className="w-full flex justify-center items-center gap-3 max-w-4xl mx-auto mt-2">
                <div className="relative flex-1 max-w-md flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-1 hover:border-white/20 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40 transition-all duration-300 shadow-inner">
                    <BiSearch className="text-gray-400 text-xl flex-shrink-0" />
                    <input 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        type="text" 
                        placeholder="Search catalog products..." 
                        className="w-full bg-transparent pl-3 pr-2 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery("");
                                setSearchParams({});
                            }}
                            className="text-gray-400 hover:text-white text-xs font-bold px-2 py-1 cursor-pointer transition-colors"
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <button 
                    className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl shadow-md hover:shadow-glow-blue focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 cursor-pointer font-bold text-sm" 
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* Controls Section (Categories & Sorting) */}
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-6 border-b border-white/5 pb-4">
                {/* Categories Pill list */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setIsSortOpen(false);
                            }}
                            className={`px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                                selectedCategory === cat
                                    ? "bg-accent text-white border-accent shadow-glow-blue hover:bg-accent-dark"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10 hover:border-white/20"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 relative z-20" ref={sortDropdownRef}>
                    <span className="text-sm text-gray-400 font-semibold">Sort by:</span>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-white/10 cursor-pointer transition-all duration-200 min-w-[150px] justify-between"
                    >
                        <span>{sortBy}</span>
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
            <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-2 mt-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCard key={item.productId} product={item} />
                    ))
                ) : (
                    <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800/40 border border-slate-700/30 flex items-center justify-center mb-2 shadow-inner">
                            <BiShoppingBag className="text-slate-400 text-3xl" />
                        </div>
                        <p className="text-white text-lg font-bold">No Products Found</p>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            We couldn't find any products matching your search query or filter. Try checking your spelling or adjusting filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}