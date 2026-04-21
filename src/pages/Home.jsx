import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Flame, Star, Sparkles, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainContainer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation: Entrance
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title", {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.2,
        })
        .from(
          ".hero-img",
          {
            scale: 0,
            rotate: -15,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5",
        );

      // 2. Customer Favorites: The "Flying-In" Animation
      // Elements fly from left and right as they enter the viewport
      gsap.utils.toArray(".fav-item").forEach((item, index) => {
        const direction = index % 2 === 0 ? -200 : 200;
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: direction,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // 3. Must Try: The "Layered Slide" Animation
      // Cards slide in from different angles
      gsap.from(".must-try-card", {
        scrollTrigger: {
          trigger: ".must-try-section",
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // 4. New Releases: Marquee and Spotlight
      gsap.from(".release-text", {
        scrollTrigger: {
          trigger: ".release-section",
          start: "top 80%",
        },
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });
    }, mainContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainContainer}
      className="bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-black overflow-x-hidden"
    >
      {/* --- SCENE 1: HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="hero-title text-8xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase">
              UNS <br /> <span className="text-orange-500">CAFE.</span>
            </h1>
            <p className="hero-title mt-8 text-gray-400 text-xl md:text-2xl max-w-lg font-light leading-relaxed">
              Where{" "}
              <span className="text-white font-medium">understated luxury</span>{" "}
              meets bold flavors in the heart of Kolkata.
            </p>
            <div className="hero-title mt-12">
              <Link
                to="/menu"
                className="group bg-white text-black font-black px-10 py-5 rounded-full flex items-center gap-4 transition-all hover:bg-orange-500 hover:scale-110 w-fit uppercase tracking-tighter"
              >
                Discover the Taste{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="relative hero-img">
            <div className="absolute -inset-10 bg-orange-500/30 blur-[120px] rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f27?q=80&w=1000"
              alt="Cafe"
              className="relative z-10 rounded-[4rem] shadow-2xl border border-white/10 rotate-6 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* --- SCENE 2: CUSTOMER FAVORITES (The Staggered Scroll) --- */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Crowd <br /> <span className="text-orange-500">Favorites.</span>
            </h2>
            <p className="text-gray-500 max-w-xs text-right uppercase font-bold tracking-widest text-sm">
              The dishes that keep our regulars coming back every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Item 1 */}
            <div className="fav-item relative group">
              <div className="overflow-hidden rounded-[3rem] border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000"
                  className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Tacos"
                />
              </div>
              <div className="absolute -bottom-10 -left-5 bg-orange-500 text-black p-8 rounded-3xl max-w-xs">
                <h3 className="text-3xl font-black uppercase">
                  Mutton Kosha Tacos
                </h3>
                <p className="font-medium opacity-80">
                  Our signature fusion hit.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="fav-item relative group md:mt-32">
              <div className="overflow-hidden rounded-[3rem] border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1599487488170-d17160676531?q=80&w=1000"
                  className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Prawns"
                />
              </div>
              <div className="absolute -bottom-10 -right-5 bg-white text-black p-8 rounded-3xl max-w-xs text-right">
                <h3 className="text-3xl font-black uppercase">
                  Beer-Battered Prawns
                </h3>
                <p className="font-medium opacity-80">
                  Crispy, golden, and bold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCENE 3: MUST TRY (The Layered Slide) --- */}
      <section className="must-try-section py-32 bg-zinc-900/30 px-6">
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
                className="must-try-card group relative h-[500px] overflow-hidden rounded-[3rem] border border-white/10"
              >
                <img
                  src={item.img}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-4xl font-black uppercase leading-none mb-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-black text-2xl">
                      {item.price}
                    </span>
                    <div className="p-4 bg-white text-black rounded-full group-hover:bg-orange-500 transition-colors">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCENE 4: NEW RELEASES (The Hype) --- */}
      <section className="release-section py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-orange-500 -z-10"></div>
        <div className="flex whitespace-nowrap">
          <div className="release-text flex animate-marquee text-black text-7xl md:text-9xl font-black uppercase tracking-tighter gap-10">
            <span>
              New Summer Menu <Sparkles size={80} />{" "}
            </span>
            <span>
              Limited Edition Shakes <Sparkles size={80} />{" "}
            </span>
            <span>
              Fresh Fruit Wraps <Sparkles size={80} />{" "}
            </span>
            {/* Duplicate for seamless loop */}
            <span>
              New Summer Menu <Sparkles size={80} />{" "}
            </span>
            <span>
              Limited Edition Shakes <Sparkles size={80} />{" "}
            </span>
            <span>
              Fresh Fruit Wraps <Sparkles size={80} />{" "}
            </span>
          </div>
        </div>
      </section>

      {/* --- SCENE 5: THE FINAL CTA --- */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[150px] rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-12">
            Ready to <br /> <span className="text-orange-500">Feast?</span>
          </h2>
          <Link
            to="/menu"
            className="inline-block bg-white text-black text-2xl font-black px-16 py-8 rounded-full hover:bg-orange-500 transition-all hover:scale-125 duration-500 shadow-2xl uppercase tracking-tighter"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/10 px-6 bg-black">
        <div className="container mx-auto grid md:grid-cols-3 gap-12 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              UNS CAFE.
            </h3>
            <p className="text-gray-500 mt-2">
              37/1, Purna Das Rd, Kalighat, Kolkata.
            </p>
          </div>
          <div className="flex justify-center gap-8 uppercase text-xs font-black tracking-widest text-gray-400">
            <Link
              to="/menu"
              className="hover:text-orange-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/gallery"
              className="hover:text-orange-500 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="text-center md:text-right text-gray-600 text-xs font-bold">
            © 2026 UNS CAFE. DESIGNED FOR THE BOLD.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
