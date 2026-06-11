import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
    
    useEffect(() => {
        document.title = "Page Not Found | IONIX Computers";
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl text-gray-500">Page Not Found</p>
            <Link to="/" className="px-4 py-2 bg-accent text-white rounded">Go to Home</Link>
        </div>
    )
}