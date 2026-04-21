import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, MapPin, Clock, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainContainer = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. HERO ANIMATION ---
      const heroTl = gsap.timeline();
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
          { y: 50, opacity: 0, duration: 1, ease: "power3.out" },
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

      gsap.to(".hero-img", {
        y: -20,
        x: 10,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --- 2. PHILOSOPHY TEXT SCRUB ---
      // Text characters/words light up as you scroll down
      gsap.to(".philosophy-word", {
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power1.out",
      });

      // --- 3. CUSTOMER FAVORITES PARALLAX ---
      gsap.utils.toArray(".fav-item").forEach((item) => {
        const img = item.querySelector(".fav-img");
        const content = item.querySelector(".fav-content");

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

      // --- 4. THE EXPERIENCE (HORIZONTAL SCROLL) ---
      // Using matchMedia so it only pins on desktop. On mobile, it scrolls normally.
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const horizontalWrapper = document.querySelector(".horizontal-wrapper");

        gsap.to(horizontalWrapper, {
          x: () => -(horizontalWrapper.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-container",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => "+=" + horizontalWrapper.scrollWidth,
          },
        });
      });

      // --- 5. MUST TRY LAYERED REVEAL ---
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

      // --- 6. INFINITE MARQUEE ---
      const marqueeWidth = document.querySelector(
        ".release-text-track",
      ).offsetWidth;
      gsap.to(".release-text-track", {
        x: -marqueeWidth / 2,
        duration: 15,
        ease: "none",
        repeat: -1,
      });

      // --- 7. LOCATION SECTION ENTRANCE ---
      gsap.from(".location-box", {
        scrollTrigger: {
          trigger: ".location-section",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // --- 8. FINAL CTA ---
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
      {/* SCENE 1: HERO */}
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
              src="https://images.pexels.com/photos/958547/pexels-photo-958547.jpeg"
              alt="Cafe Atmosphere"
              className="hero-img relative z-10 w-[90%] rounded-[4rem] shadow-2xl border border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* SCENE 1.5: PHILOSOPHY (TEXT REVEAL) */}
      <section className="philosophy-section py-40 px-6 bg-orange-500 text-black flex items-center justify-center rounded-[3rem] mx-4 md:mx-10 my-20">
        <div className="container mx-auto text-center">
          <p className="text-4xl md:text-7xl font-black uppercase leading-tight tracking-tighter max-w-5xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              "We",
              "don't",
              "just",
              "brew",
              "coffee.",
              "We",
              "craft",
              "experiences.",
              "Every",
              "cup",
              "is",
              "a",
              "story",
              "of",
              "bold",
              "flavors",
              "and",
              "uncompromising",
              "quality.",
            ].map((word, i) => (
              <span
                key={i}
                className="philosophy-word opacity-20 translate-y-10 inline-block"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* SCENE 2: CUSTOMER FAVORITES */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Crowd <br /> <span className="text-orange-500">Favorites.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
            <div className="fav-item relative group w-full">
              <div className="overflow-hidden rounded-[3rem] border border-white/10 h-[600px] w-full relative">
                <img
                  src="https://img.clevup.in/272541/SKU-1373_0-1771486227759.png?width=600&format=webp"
                  className="fav-img absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  alt="Tacos"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="fav-content absolute -bottom-10 md:-left-10 left-5 bg-orange-500 text-black p-8 rounded-3xl max-w-[300px] shadow-2xl">
                <h3 className="text-3xl font-black uppercase leading-none mb-2">
                  Chicken Kosha
                </h3>
                <p className="font-semibold opacity-80 text-sm uppercase tracking-wider">
                  Kolkata's fiery love affair on a plate.
                </p>
              </div>
            </div>

            <div className="fav-item relative group w-full md:mt-40 mt-10">
              <div className="overflow-hidden rounded-[3rem] border border-white/10 h-[600px] w-full relative">
                <img
                  src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Basanti_Pulao.webp"
                  className="fav-img absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  alt="Prawns"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="fav-content absolute -bottom-10 md:-right-10 right-5 bg-white text-black p-8 rounded-3xl max-w-[300px] shadow-2xl text-right">
                <h3 className="text-3xl font-black uppercase leading-none mb-2">
                  Basanti Pulao
                </h3>
                <p className="font-semibold opacity-80 text-sm uppercase tracking-wider">
                  A golden twist on a Bengali classic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 3: THE EXPERIENCE (HORIZONTAL SCROLL ON DESKTOP) */}
      <section className="horizontal-container lg:h-screen w-full bg-[#050505] overflow-hidden flex items-center py-20 lg:py-0 border-y border-white/10">
        {/* On mobile, it's just a flex-col. On desktop, flex-row that scrolls sideways */}
        <div className="horizontal-wrapper flex flex-col lg:flex-row gap-10 lg:gap-20 px-6 lg:px-20 w-full lg:w-max items-center">
          <div className="w-full lg:w-[40vw] flex-shrink-0">
            <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-6">
              The <br />
              <span className="text-orange-500">Vibe.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-md">
              Step into a space designed for conversations, late-night coding
              sessions, and unforgettable dates.
            </p>
          </div>

          <div className="w-full lg:w-[60vw] h-[60vh] flex-shrink-0 overflow-hidden rounded-[3rem]">
            <img
              src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Interior"
            />
          </div>

          <div className="w-full lg:w-[40vw] h-[60vh] flex-shrink-0 overflow-hidden rounded-[3rem]">
            <img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Pouring Coffee"
            />
          </div>

          <div className="w-full lg:w-[30vw] flex-shrink-0 lg:pr-20">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              Master Roasters
            </h3>
            <p className="text-gray-400 font-light">
              Every bean is sourced responsibly and roasted in-house to ensure
              the perfect crema on your espresso.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 4: MUST TRY */}
      <section className="must-try-section py-32 px-6">
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
                title: "Mushroom Masala",
                img: "https://www.cookwithkushi.com/wp-content/uploads/2020/03/IMG_3557_11-1024x650-1.jpg",
                price: "₹280",
              },
              {
                title: "Fish Tikka Masala",
                img: "https://foodiesterminal.com/wp-content/uploads/2019/03/Fish-tikka-masala-recipe-1-1.jpg",
                price: "₹210",
              },
              {
                title: "Navratan Korma",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMaWE4KCxxo_0dsTgy7G4Aurit0Lmom0E8SA&s",
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 5: INFINITE MARQUEE */}
      <section className="release-section py-20 overflow-hidden relative bg-orange-500 flex items-center">
        <div className="w-full flex whitespace-nowrap overflow-hidden">
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

      {/* SCENE 6: LOCATION & HOURS (NEW) */}
      <section className="location-section py-32 px-6 bg-[#111]">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10">
              Find <br />
              <span className="text-orange-500">Us.</span>
            </h2>
            <p className="text-gray-400 text-xl font-light mb-12 max-w-md">
              Drop by for your morning brew or an evening feast. We're ready for
              you.
            </p>

            <div className="space-y-8">
              <div className="location-box flex items-start gap-6 bg-black p-8 rounded-3xl border border-white/5 hover:border-orange-500/50 transition-colors">
                <MapPin className="text-orange-500 flex-shrink-0" size={32} />
                <div>
                  <h4 className="text-2xl font-black uppercase mb-2">
                    Location
                  </h4>
                  <p className="text-gray-400">
                    37/1, Purna Das Rd, <br /> Kalighat, Kolkata - 700029
                  </p>
                </div>
              </div>

              <div className="location-box flex items-start gap-6 bg-black p-8 rounded-3xl border border-white/5 hover:border-orange-500/50 transition-colors">
                <Clock className="text-orange-500 flex-shrink-0" size={32} />
                <div>
                  <h4 className="text-2xl font-black uppercase mb-2">Hours</h4>
                  <p className="text-gray-400">
                    Mon - Sun <br /> 11:00 AM – 11:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[600px] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            {/* Using a placeholder map image */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.6407451806513!2d88.3588035!3d22.517658299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02776c7fd4ab2b%3A0xe4338d1189f1b221!2sUns%20Cafe!5e0!3m2!1sen!2sus!4v1776765888562!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 0,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Uns Cafe Location"
            />
          </div>
        </div>
      </section>

      {/* SCENE 7: FINAL CTA */}
      <section className="final-section py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none"></div>
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
            <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-2 justify-center md:justify-start">
              <Coffee className="text-orange-500" /> UNS CAFE.
            </h3>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-semibold">
              37/1, Purna Das Rd, Kolkata.
            </p>
          </div>

          <div className="flex gap-8 uppercase text-sm font-black tracking-widest text-gray-400">
            {["Menu", "Gallery"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="hover:text-orange-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="text-gray-600 text-xs font-bold uppercase tracking-widest text-center md:text-right">
            © 2026 UNS CAFE. <br className="md:hidden" /> DESIGNED FOR THE BOLD.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
