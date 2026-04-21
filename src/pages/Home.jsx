import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainContainer = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation: Entrance & Continuous Float
      const heroTl = gsap.timeline();

      // Text reveal with clip-path like effect
      heroTl
        .from(".hero-text-line", {
          y: 130,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
        })
        .from(
          ".hero-btn",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".hero-img-container",
          {
            scale: 0.8,
            rotate: -10,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
          },
          "-=1",
        );

      // Continuous subtle floating effect for the hero image
      gsap.to(".hero-img", {
        y: -20,
        x: 10,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Customer Favorites: Parallax Images & Staggered Text
      gsap.utils.toArray(".fav-item").forEach((item) => {
        const img = item.querySelector(".fav-img");
        const content = item.querySelector(".fav-content");

        // Image Parallax Effect
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Content fly-in
        gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // 3. Must Try: Layered Slide & Scale Reveal
      gsap.from(".must-try-card", {
        scrollTrigger: {
          trigger: ".must-try-section",
          start: "top 75%",
        },
        y: 150,
        scale: 0.9,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.2)",
      });

      // 4. Infinite Marquee (Pure GSAP)
      const marqueeWidth = document.querySelector(
        ".release-text-track",
      ).offsetWidth;
      gsap.to(".release-text-track", {
        x: -marqueeWidth / 2, // Move half the track (since it's duplicated)
        duration: 15,
        ease: "none",
        repeat: -1,
      });

      // 5. Final CTA Scale-up
      gsap.from(".final-cta", {
        scrollTrigger: {
          trigger: ".final-section",
          start: "top 80%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });
    }, mainContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainContainer}
      className="bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-black overflow-x-hidden font-sans"
    >
      {/* --- SCENE 1: HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 relative">
            <div className="overflow-hidden">
              <h1 className="hero-text-line text-8xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase">
                UNS <br /> <span className="text-orange-500">CAFE.</span>
              </h1>
            </div>
            <div className="overflow-hidden mt-8">
              <p className="hero-text-line text-gray-400 text-xl md:text-2xl max-w-lg font-light leading-relaxed">
                Where{" "}
                <span className="text-white font-medium">
                  understated luxury
                </span>{" "}
                meets bold flavors in the heart of Kolkata.
              </p>
            </div>
            <div className="hero-btn mt-12">
              <Link
                to="/menu"
                className="group bg-white text-black font-black px-10 py-5 rounded-full flex items-center gap-4 transition-all hover:bg-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] w-fit uppercase tracking-tighter"
              >
                Discover the Taste{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <div className="hero-img-container relative flex justify-center">
            <div className="absolute inset-0 bg-orange-500/20 blur-[120px] rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f27?q=80&w=1000"
              alt="Cafe Atmosphere"
              className="hero-img relative z-10 w-[90%] rounded-[4rem] shadow-2xl border border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- SCENE 2: CUSTOMER FAVORITES (Parallax Reveal) --- */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Crowd <br /> <span className="text-orange-500">Favorites.</span>
            </h2>
            <p className="text-gray-500 max-w-xs md:text-right uppercase font-bold tracking-widest text-sm">
              The dishes that keep our regulars coming back every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
            {/* Item 1 */}
            <div className="fav-item relative group w-full">
              <div className="overflow-hidden rounded-[3rem] border border-white/10 h-[600px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000"
                  className="fav-img absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  alt="Tacos"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="fav-content absolute -bottom-10 md:-left-10 left-5 bg-orange-500 text-black p-8 rounded-3xl max-w-[300px] shadow-2xl">
                <h3 className="text-3xl font-black uppercase leading-none mb-2">
                  Mutton Kosha Tacos
                </h3>
                <p className="font-semibold opacity-80 text-sm uppercase tracking-wider">
                  Our signature fusion hit.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="fav-item relative group w-full md:mt-40 mt-10">
              <div className="overflow-hidden rounded-[3rem] border border-white/10 h-[600px] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1599487488170-d17160676531?q=80&w=1000"
                  className="fav-img absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  alt="Prawns"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="fav-content absolute -bottom-10 md:-right-10 right-5 bg-white text-black p-8 rounded-3xl max-w-[300px] shadow-2xl text-right">
                <h3 className="text-3xl font-black uppercase leading-none mb-2">
                  Beer-Battered Prawns
                </h3>
                <p className="font-semibold opacity-80 text-sm uppercase tracking-wider">
                  Crispy, golden, and bold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCENE 3: MUST TRY (Layered Slide) --- */}
      <section className="must-try-section py-32 bg-zinc-900/50 px-6 border-y border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">
              Chef's Recommendation
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Must <span className="text-orange-500">Try.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dahi Kebabs",
                img: "https://images.unsplash.com/photo-1599487488170-d17160676531?q=80&w=800",
                price: "₹280",
              },
              {
                title: "Irish Coffee",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800",
                price: "₹210",
              },
              {
                title: "Cheese Garlic Bread",
                img: "https://images.unsplash.com/photo-1573140247632-f8f9fada7c7c?q=80&w=800",
                price: "₹180",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="must-try-card group relative h-[500px] overflow-hidden rounded-[3rem] border border-white/10 cursor-pointer"
              >
                <img
                  src={item.img}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl font-black uppercase leading-none mb-4">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-black text-3xl">
                      {item.price}
                    </span>
                    <div className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                      <ArrowRight
                        size={24}
                        className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCENE 4: NEW RELEASES (GSAP Infinite Marquee) --- */}
      <section className="release-section py-24 overflow-hidden relative bg-orange-500 flex items-center">
        <div className="w-full flex whitespace-nowrap overflow-hidden">
          {/* We create a track that holds two identical sets of content to scroll infinitely */}
          <div className="release-text-track flex items-center text-black text-7xl md:text-9xl font-black uppercase tracking-tighter gap-10 w-max">
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-10">
                  New Summer Menu <Sparkles size={80} />
                </span>
                <span className="flex items-center gap-10">
                  Limited Edition Shakes <Sparkles size={80} />
                </span>
                <span className="flex items-center gap-10">
                  Fresh Fruit Wraps <Sparkles size={80} />
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCENE 5: THE FINAL CTA --- */}
      <section className="final-section py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="final-cta relative z-10 flex flex-col items-center">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">
            Ready to <br /> <span className="text-orange-500">Feast?</span>
          </h2>
          <Link
            to="/menu"
            className="group relative inline-flex items-center justify-center bg-white text-black text-2xl font-black px-16 py-8 rounded-full overflow-hidden shadow-2xl uppercase tracking-tighter"
          >
            <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-500">
              View Full Menu
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 px-6 bg-[#050505]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-black uppercase tracking-tighter">
              UNS CAFE.
            </h3>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">
              37/1, Purna Das Rd, Kolkata.
            </p>
          </div>

          <div className="flex gap-8 uppercase text-sm font-black tracking-widest text-gray-400">
            {["Menu", "Gallery", "Contact"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="hover:text-orange-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="text-gray-600 text-xs font-bold uppercase tracking-widest">
            © 2026 UNS CAFE. <br className="md:hidden" /> DESIGNED FOR THE BOLD.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
