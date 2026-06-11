import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProductPage(){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Add Product | IONIX Computers";
    }, []);

    async function handleSave(){

        try{
            setIsSaving(true);
            
            // Validation
            if (!productId.trim()) {
                toast.error("Product ID is required");
                setIsSaving(false);
                return;
            }
            if (!name.trim()) {
                toast.error("Product name is required");
                setIsSaving(false);
                return;
            }
            if (!price || isNaN(price) || price <= 0) {
                toast.error("Valid price is required");
                setIsSaving(false);
                return;
            }
            if (!labelledPrice || isNaN(labelledPrice) || labelledPrice <= 0) {
                toast.error("Valid labelled price is required");
                setIsSaving(false);
                return;
            }
            if (!description.trim()) {
                toast.error("Description is required");
                setIsSaving(false);
                return;
            }
            if (images.length === 0) {
                toast.error("At least one image is required");
                setIsSaving(false);
                return;
            }
            if (!brand) {
                toast.error("Brand is required");
                setIsSaving(false);
                return;
            }
            if (!model.trim()) {
                toast.error("Model is required");
                setIsSaving(false);
                return;
            }
            if (!category) {
                toast.error("Category is required");
                setIsSaving(false);
                return;
            }

            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to perform this action.");
                setIsSaving(false);
                window.location.href = "/login";
                return;
            }

            const mediaUploadPromises = []

            for(let i=0; i<images.length; i++){

                mediaUploadPromises.push(uploadMedia(images[i]));

            }

            const urls = await Promise.all(mediaUploadPromises);
            if (!urls || urls.length === 0) {
                toast.error("Failed to upload images");
                setIsSaving(false);
                return;
            }
            const altNamesArray = altNames.split(",")

            const productData = {
                productId : productId,
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


            await axios.post(import.meta.env.VITE_API_URL+"/products", productData,
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            )

            toast.success("Product added successfully!");
            setIsSaving(false);
            navigate("/admin/products");


        }catch(error){
            setIsSaving(false);
            console.error("Error adding product:", error);
            console.log("Error response data:", error?.response);
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to add product. Please try again.";
            toast.error(errorMessage);
        }
    }

    return(
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll ">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl">
                <h1 className="text-2xl font-semibold">Add New Product</h1>
                <div className="h-full flex justify-center items-center">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" >{isSaving? "Saving..." : "Save"}</button>
                    <button onClick={() => navigate("/admin/products")} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
                </div>
            </div>
            <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 mt-8 rounded-lg">
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Product ID</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={productId}
                        onChange={(e)=>{setProductId(e.target.value)}}
                    />
                </div>
                <div className="w-3/4 p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Name</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Alternative Names (comma separated)</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={altNames}
                        onChange={(e)=>{setAltNames(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Labelled Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={labelledPrice}
                        onChange={(e)=>{setLabelledPrice(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Category</label>
                    <select
                    value={category}
                    onChange={
                        (e)=>{
                            setCategory(e.target.value);                            
                        }                        
                    } className="border border-gray-300 rounded-md p-2 w-full text-gray-800">
                        <option value="Laptop" >Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camera">Camera</option>
                        <option value="Others">Others</option>
                        {/* graphic cards, processors, ssd, monitors, printers */}
                        <option value="Graphic Card">Graphic Card</option>
                        <option value="Processor">Processor</option>
                        <option value="SSD">SSD</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Printer">Printer</option>
                    </select>
                </div>
                <div className="w-1/4   p-2">
                    {/* images */}
                    <label className="block mb-2 font-semibold text-gray-800">Images</label>
                    <input type="file" multiple className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        onChange={
                            (e)=>{
                                setImages(e.target.files)
                            }
                        }
                    />
                </div>
                <div className="w-full   p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Description</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select
                        value={brand}
                        onChange={
                            (e)=>{
                                setBrand(e.target.value);                            
                            }
                        } className="border border-gray-300 rounded-md p-2 w-full text-gray-800">
                        <option value="Apple" >Apple</option>
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
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Model</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={model}
                        onChange={(e)=>{setModel(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold text-gray-800">Stock</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        value={stock}
                        onChange={(e)=>{setStock(e.target.value)}}
                    />
                </div>
                {/* <div className="w-1/4   p-2 flex items-center">
                    <label className="block mb-2 font-semibold mr-4">Available</label>
                    <input type="checkbox" checked={isAvailable} onChange={(e)=>{setIsAvailable(e.target.checked)}} />
                </div> */}
                <div className="w-1/4   p-2 ">
                    <label className="block mb-2 font-semibold text-gray-800">Availability</label>
                    <select
                        value={String(isAvailable)}
                        onChange={
                            (e)=>{
                                setIsAvailable(e.target.value === "true");
                            }
                        } className="border border-gray-300 rounded-md p-2 w-full text-gray-800">
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
            </div>
            
        </div>
    )
}