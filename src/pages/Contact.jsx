import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-[#0a0a0a] min-h-screen text-white">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* CONTACT INFO */}
        <div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
            Let's <br /> <span className="text-orange-500">Connect.</span>
          </h1>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 bg-zinc-900 rounded-2xl group-hover:bg-orange-500 transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                  Call us
                </p>
                <p className="text-2xl font-medium">+91 91238 28478</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 bg-zinc-900 rounded-2xl group-hover:bg-orange-500 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                  Email us
                </p>
                <p className="text-2xl font-medium">hello@unscafe.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 bg-zinc-900 rounded-2xl group-hover:bg-orange-500 transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                  Visit us
                </p>
                <p className="text-xl font-medium">
                  37/1, Purna Das Rd, Kalighat, Kolkata
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOM MAP SECTION */}
        <div className="relative">
          {/* Decorative background blob */}
          <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              title="Uns Cafe Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.6384454478234!2d88.35624017614883!3d22.51774453497703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02776c7fd4ab2b%3A0xe4338d1189f1b221!2sUns%20Cafe!5e0!3m2!1sen!2sus!4v1776764559217!5m2!1sen!2sus"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
