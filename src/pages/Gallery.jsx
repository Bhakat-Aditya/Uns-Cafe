import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// 1. AUTO-IMPORT LOCAL IMAGES (VITE MAGIC)
// This grabs all images you drop into src/assets/gallery/
const localImagesModules = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  },
);
const localImages = Object.values(localImagesModules);

// Fallback images just in case the folder is empty right now
const fallbackImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
];

// Use local images if they exist, otherwise use fallbacks
const displayImages = localImages.length > 0 ? localImages : fallbackImages;

const Gallery = () => {
  const container = useRef();
  const lightboxRef = useRef();
  const lightboxImgRef = useRef();

  // Lightbox State
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for right, -1 for left

  // --- MASONRY GRID ANIMATION ---
  useGSAP(
    () => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    },
    { scope: container },
  );

  // --- LIGHTBOX IMAGE TRANSITION ANIMATION ---
  useGSAP(
    () => {
      if (isOpen && lightboxImgRef.current) {
        gsap.fromTo(
          lightboxImgRef.current,
          {
            opacity: 0,
            x: 100 * slideDirection, // Slide from left or right based on direction
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      }
    },
    { dependencies: [currentIndex, isOpen], scope: lightboxRef },
  );

  // --- HANDLERS ---
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSlideDirection(0); // No slide on first open, just pop in
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Lock background scrolling
  };

  const closeLightbox = () => {
    // Fade out animation before unmounting
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
      },
    });
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSlideDirection(1);
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSlideDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={container}
      className="pt-32 pb-20 px-6 bg-[#0a0a0a] min-h-screen text-white"
    >
      <div className="container mx-auto">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-center">
          Visual <span className="text-orange-500">Vibes.</span>
        </h1>

        {/* MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {displayImages.map((src, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="gallery-item break-inside-avoid relative group overflow-hidden rounded-3xl cursor-pointer border border-white/5 shadow-2xl"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                <p className="text-white text-xl font-black uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Full
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX OVERLAY */}
      {isOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={closeLightbox} // Click outside to close
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-orange-500 hover:scale-110 transition-all duration-300 z-50 p-2"
          >
            <X size={40} />
          </button>

          {/* Left Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-10 text-white/50 hover:text-orange-500 hover:scale-125 transition-all duration-300 z-50 p-4"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Right Navigation */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-10 text-white/50 hover:text-orange-500 hover:scale-125 transition-all duration-300 z-50 p-4"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full px-16 md:px-24 flex justify-center items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing lightbox
          >
            <img
              ref={lightboxImgRef}
              src={displayImages[currentIndex]}
              alt="Lightbox"
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.15)]"
            />

            {/* Image Counter */}
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-gray-500 font-bold tracking-widest text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
