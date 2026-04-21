import React, { useState, useEffect, useRef } from "react";
import menuData from "../data/menu.json";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(menuData.items);
  const containerRef = useRef(null);

  useEffect(() => {
    const filtered =
      activeCategory === "All"
        ? menuData.items
        : menuData.items.filter((item) => item.category === activeCategory);
    setFilteredItems(filtered);
  }, [activeCategory]);

  useGSAP(
    () => {
      // FIX: Using fromTo explicitly sets the final state (opacity: 1, scale: 1)
      // so it never gets stuck midway during rapid clicks or React re-renders.
      gsap.fromTo(
        ".menu-card",
        {
          opacity: 0,
          scale: 0.9,
          y: 30, // Added a subtle vertical slide to make it feel more premium
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(1.5)",
          clearProps: "all", // Clears inline styles after animation finishes
        },
      );
    },
    { scope: containerRef, dependencies: [filteredItems] },
  );

  return (
    <div
      ref={containerRef}
      className="pt-32 pb-20 px-6 bg-[#0a0a0a] min-h-screen text-white"
    >
      <div className="container mx-auto">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 text-center">
          The <span className="text-orange-500">Menu.</span>
        </h1>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {menuData.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-orange-500 text-black scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-card p-6 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-orange-500 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <span className="text-orange-500 font-black text-xl">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-gray-400 mb-6">{item.desc}</p>
              {item.tag && (
                <span className="text-[10px] uppercase tracking-widest bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full font-bold">
                  {item.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
