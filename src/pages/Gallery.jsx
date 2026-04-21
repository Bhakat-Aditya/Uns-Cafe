import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const images = [
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800', height: 'h-64' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800', height: 'h-96' },
  { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800', height: 'h-72' },
  { url: 'https://images.unsplash.com/photo-1567620905732-2d1luxe-80&w=800', height: 'h-80' },
  { url: 'https://images.unsplash.com/photo-1559339763-36757760953d?q=80&w=800', height: 'h-96' },
  { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800', height: 'h-64' },
  { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcddd20a?q=80&w=800', height: 'h-80' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800', height: 'h-72' },
];

const Gallery = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from(".gallery-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-6 bg-[#0a0a0a] min-h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-center">
          Visual <span className="text-orange-500">Vibes.</span>
        </h1>
        
        {/* MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <div key={index} className="gallery-item break-inside-avoid relative group overflow-hidden rounded-2xl cursor-pointer">
              <img 
                src={img.url} 
                alt="cafe" 
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-bold uppercase tracking-widest">View Full</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;