import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminEditProductPage(){

    const location = useLocation();
    const [productId, setProductId] = useState(location.state?.productId || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altNames, setAltNames] = useState(location.state?.altNames ? location.state.altNames.join(",") : "");
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState(location.state?.brand || "");
    const [model, setModel] = useState(location.state?.model || "");
    const [category, setCategory] = useState(location.state?.category || "");
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable || false);
    const [stock, setStock] = useState(location.state?.stock || 0);
    const [isUpdating, setIsUpdating] = useState(false);

    const navigate = useNavigate();

    console.log("Location state: ", location.state);
    
    useEffect(
        ()=>{
            document.title = "Edit Product | IONIX Computers";
            if(location.state==null){
                toast.error("No product data found. Please select a product to edit.");
                navigate("/admin/products");
            }
        },[]
    )
    
    async function handleUpdate(){

        try{

            setIsUpdating(true);
            
            // Validation
            if (!name.trim()) {
                toast.error("Product name is required");
                setIsUpdating(false);
                return;
            }
            if (!price || isNaN(price) || price <= 0) {
                toast.error("Valid price is required");
                setIsUpdating(false);
                return;
            }
            if (!labelledPrice || isNaN(labelledPrice) || labelledPrice <= 0) {
                toast.error("Valid labelled price is required");
                setIsUpdating(false);
                return;
            }
            if (!description.trim()) {
                toast.error("Description is required");
                setIsUpdating(false);
                return;
            }
            if (!brand) {
                toast.error("Brand is required");
                setIsUpdating(false);
                return;
            }
            if (!model.trim()) {
                toast.error("Model is required");
                setIsUpdating(false);
                return;
            }
            if (!category) {
                toast.error("Category is required");
                setIsUpdating(false);
                return;
            }

            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to perform this action.");
                setIsUpdating(false);
                window.location.href = "/login";
                return;
            }

            const mediaUploadPromises = []

            for(let i=0; i<images.length; i++){

                mediaUploadPromises.push(uploadMedia(images[i]));

            }

            const urls = await Promise.all(mediaUploadPromises);
            if (urls.length > 0 && (!urls[0] || urls.some(url => !url))) {
                toast.error("Failed to upload images");
                setIsUpdating(false);
                return;
            }

            const altNamesArray = altNames.trim() ? altNames.split(",").map(name => name.trim()) : []

            const productData = {
                name : name,
                altNames : altNamesArray,
                price : price,
                labelledPrice : labelledPrice,
                description : description,
                images : urls,
                brand : brand,
                model : model,
                category : category,
                isAvailable : isAvailable,
                stock : stock
            }

            if(urls.length == 0){
                productData.images = location.state.images;
            }

            await axios.put(import.meta.env.VITE_API_URL+"/products/"+productId, productData,
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            )

            toast.success("Product updated successfully!");
            setIsUpdating(false);
            navigate("/admin/products");


        }catch(error){
            setIsUpdating(false);
            console.error("Error Updating product:", error);
            console.log("Error response data:", error?.response);
            toast.error(error?.response?.data?.message || "Failed to Update product. Please try again.")
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-6 overflow-y-auto custom-scrollbar-light bg-gray-50">
            <div className="sticky top-0 z-20 w-full min-h-[90px] rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white border border-white/10 shadow-lg flex items-center p-5 justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <p className="text-xs text-white/80 mt-0.5">Modify an existing product listing details</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate("/admin/products")} 
                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 hover:border-white/30 uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdate} 
                        className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-200 cursor-pointer" 
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </div>

            <div className="w-full bg-white border border-gray-200 shadow-sm p-6 mt-6 rounded-2xl flex flex-wrap gap-y-4">
                {/* Section: Basic Identification */}
                <div className="w-full text-xs font-bold text-accent border-b border-gray-100 pb-1.5 mb-2 mt-2 uppercase tracking-widest">
                    Product Identification
                </div>
                
                <div className="w-full md:w-1/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Product ID</label>
                    <input 
                        className="border border-gray-200 bg-gray-100 rounded-xl p-3 w-full text-gray-400 text-sm focus:outline-none cursor-not-allowed font-medium"
                        value={productId}
                        disabled={true}
                        onChange={(e)=>{setProductId(e.target.value)}}
                    />
                </div>
                
                <div className="w-full md:w-3/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Product Name</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={name}
                        placeholder="e.g. ASUS TUF Gaming B650 Motherboard"
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                
                <div className="w-full p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Alternative Search Tags (comma separated)</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={altNames}
                        placeholder="e.g. am5 motherboard, b650 wifi, asus tuf b650"
                        onChange={(e)=>{setAltNames(e.target.value)}}
                    />
                </div>

                {/* Section: Specifications */}
                <div className="w-full text-xs font-bold text-accent border-b border-gray-100 pb-1.5 mb-2 mt-4 uppercase tracking-widest">
                    Product Details & Description
                </div>
                
                <div className="w-full p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200 h-32 resize-none"
                        value={description}
                        placeholder="Provide detailed technical specifications and features..."
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>

                <div className="w-full md:w-1/3 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Brand</label>
                    <select
                        value={brand}
                        onChange={(e)=>{setBrand(e.target.value)}} 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                    >
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="AMD">AMD</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="w-full md:w-1/3 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Model</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={model}
                        placeholder="e.g. B650-PLUS WIFI"
                        onChange={(e)=>{setModel(e.target.value)}}
                    />
                </div>

                <div className="w-full md:w-1/3 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Category</label>
                    <select
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)}} 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                    >
                        <option value="">Select Category</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camera">Camera</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Graphic Card">Graphic Card</option>
                        <option value="Processor">Processor</option>
                        <option value="SSD">SSD</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Printer">Printer</option>
                        <option value="RAM">RAM</option>
                        <option value="Power Supply">Power Supply</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Section: Inventory, Pricing & Media */}
                <div className="w-full text-xs font-bold text-accent border-b border-gray-100 pb-1.5 mb-2 mt-4 uppercase tracking-widest">
                    Pricing, Inventory & Media
                </div>

                <div className="w-full md:w-1/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Selling Price (LKR)</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={price}
                        placeholder="e.g. 96000"
                        onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </div>

                <div className="w-full md:w-1/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Original Price (LKR)</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={labelledPrice}
                        placeholder="e.g. 115000"
                        onChange={(e)=>{setLabelledPrice(e.target.value)}}
                    />
                </div>

                <div className="w-full md:w-1/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Stock Count</label>
                    <input 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                        value={stock}
                        placeholder="e.g. 10"
                        onChange={(e)=>{setStock(e.target.value)}}
                    />
                </div>

                <div className="w-full md:w-1/4 p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Availability Status</label>
                    <select
                        value={String(isAvailable)}
                        onChange={(e)=>{setIsAvailable(e.target.value === "true")}} 
                        className="border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-xl p-3 w-full text-gray-800 text-sm focus:outline-none transition-all duration-200"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>

                <div className="w-full p-2">
                    <label className="block mb-1.5 font-bold text-[11px] text-gray-400 uppercase tracking-wider">Product Images</label>
                    <div className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-accent/40 transition-colors duration-200">
                        <input 
                            type="file" 
                            multiple 
                            className="text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-accent/10 file:text-accent file:cursor-pointer hover:file:bg-accent/20 transition-all cursor-pointer"
                            onChange={(e)=>{setImages(e.target.files)}}
                        />
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-3">Select multiple files (this will replace existing images)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}