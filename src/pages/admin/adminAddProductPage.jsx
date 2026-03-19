import { useState } from "react";

export default function AdminAddProductPage() {

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

    // productId
    // name
    // altNames
    // price
    // labelledPrice
    // description
    // images
    // brand
    // model
    // category
    // isAvailble
    // stock

    return (
        <div className="w-full h-full flex justify-center p-4">
            <div className="w-full h-[100px]  rounded-lg bg-accent text-white flex items-center p-5">
                <h1 className="text-2xl font-bold mb-8 w-full">Add Product</h1>
                <div className="h-full">
                    <button className="bg-white text-accent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                    <button className="bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2">Cancel</button>
                </div>
            </div>

        </div>
    )
}