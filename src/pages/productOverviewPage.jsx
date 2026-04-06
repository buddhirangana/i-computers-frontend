import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";

export default function ProductOverviewPage() {
    const parameters = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(
        () => {
            api.get("/products/" + parameters.productId).then(
                (response) => {
                    setProduct(response.data);
                    setStatus("loaded");
                }
            ).catch(
                (error) => {
                    toast.error(error?.response?.data?.message || "An error occurred while fetching the product details.");
                    navigate("/");
                }
            );

        }
        , []
    );

    return (
        <div className="w-full h-full flex justify-center items-center">
            {
                status === "loading" && <LoadingAnimation />
            }
            {
                status === "error"
            }
            
        </div>
    )
}