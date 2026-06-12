import { useState } from "react"
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi"

export default function ImageSlideShow(props){
    const [activeImage , setActiveImage] = useState(0)
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
    const [isZoomed, setIsZoomed] = useState(false)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    
    const images = props.images || []

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setZoomPos({ x, y })
    }

    return(
        <div className="w-full max-w-[550px] flex flex-col gap-4">
            {/* Main Image Viewport with Hover Zoom */}
            <div 
                className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#0b0f19]/30 border border-white/5 group flex items-center justify-center cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => {
                    setIsZoomed(false)
                    setZoomPos({ x: 50, y: 50 })
                }}
            >
                {/* Main Product Image */}
                {images.length > 0 ? (
                    <img 
                        className="w-full h-full object-contain p-6 transition-transform duration-100 ease-out select-none pointer-events-none" 
                        src={images[activeImage]} 
                        alt="Product view"
                        style={{
                            transform: isZoomed ? "scale(2.2)" : "scale(1)",
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        }}
                    />
                ) : (
                    <div className="text-gray-500 text-sm">No images available</div>
                )}

                {/* Top-Left Zoom Icon Button */}
                {images.length > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsLightboxOpen(true)
                        }}
                        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 shadow-md backdrop-blur-md cursor-pointer"
                        title="Enlarge Image"
                    >
                        <FiZoomIn className="text-lg" />
                    </button>
                )}
            </div>

            {/* Bottom thumbnail selector */}
            {images.length > 1 && (
                <div className="w-full gap-3 flex items-center justify-center flex-wrap mt-2">
                    {images.map((item, index) => (
                        <img 
                            key={index}
                            className={`w-20 h-20 object-contain p-1.5 bg-[#0b0f19]/20 hover:bg-[#0b0f19]/40 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                index === activeImage 
                                    ? "border-accent bg-accent/5 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                                    : "border-white/5 hover:border-white/20"
                            }`}
                            onClick={() => setActiveImage(index)}
                            src={item}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999] flex flex-col justify-between items-center p-6 animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Top Bar with metadata and close button */}
                    <div className="w-full flex justify-between items-center max-w-6xl text-white mt-2 shrink-0">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-light bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded">
                                Image Viewer
                            </span>
                            <span className="text-xs text-white/60 mt-1">Image {activeImage + 1} of {images.length}</span>
                        </div>
                        <button 
                            onClick={() => setIsLightboxOpen(false)}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-inner"
                        >
                            <FiX className="text-lg" />
                        </button>
                    </div>

                    {/* Image Viewport with Navigation */}
                    <div className="relative w-full max-w-5xl flex-grow flex items-center justify-center my-4 min-h-0">
                        {/* Prev Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                                }}
                                className="absolute left-4 w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-md backdrop-blur-md"
                            >
                                <FiChevronLeft className="text-2xl" />
                            </button>
                        )}

                        {/* High-res Image */}
                        <img 
                            src={images[activeImage]} 
                            alt="Product view zoom" 
                            className="max-w-full max-h-[70vh] object-contain rounded-2xl select-none"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                                }}
                                className="absolute right-4 w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-md backdrop-blur-md"
                            >
                                <FiChevronRight className="text-2xl" />
                            </button>
                        )}
                    </div>

                    {/* Lightbox thumbnail slider strip */}
                    {images.length > 1 && (
                        <div className="w-full flex justify-center gap-3 overflow-x-auto py-2 shrink-0 max-w-xl">
                            {images.map((item, index) => (
                                <img
                                    key={index}
                                    src={item}
                                    alt={`thumbnail-${index}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveImage(index)
                                    }}
                                    className={`w-16 h-16 object-contain p-1 bg-white/5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-white/40 ${
                                        index === activeImage ? "border-accent scale-105 bg-accent/5" : "border-white/10"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}