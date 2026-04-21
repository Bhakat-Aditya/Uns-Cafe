import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const navRef = useRef(null);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          y: "0%",
          duration: 0.6,
          ease: "expo.out",
        });
        gsap.fromTo(
          ".mobile-link",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            ease: "power3.out",
          },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "expo.inOut",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Gallery", path: "/gallery" }
  ];

  return (
    <div ref={navRef}>
      {/* MAIN NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/5 transition-all duration-300">
        {/* LOGO */}
        <Link
          to="/"
          className="relative z-50 text-3xl font-black tracking-tighter text-white uppercase group"
          onClick={() => setIsOpen(false)}
        >
          UNS
          <span className="text-orange-500 group-hover:text-white transition-colors duration-300">
            CAFE.
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm font-black uppercase tracking-[0.2em] text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group py-2"
            >
              <span className="group-hover:text-orange-500 transition-colors duration-300">
                {link.name}
              </span>
              {/* Subtle underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-500 ease-out"></span>
            </Link>
          ))}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className="relative z-50 md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={32} className="text-orange-500" />
          ) : (
            <Menu size={32} />
          )}
        </button>
      </nav>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center items-center px-6 -translate-y-full"
      >
        <div className="flex flex-col items-center gap-8 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link text-5xl font-black uppercase tracking-tighter text-white hover:text-orange-500 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="mobile-link w-full max-w-xs mt-8 h-[1px] bg-white/10"></div>
        </div>

        {/* Decorative background blur for mobile menu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </div>
    </div>
  );
};

export default Navbar;
