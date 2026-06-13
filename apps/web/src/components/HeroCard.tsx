"use client";

import { useState, useEffect } from "react";

export default function HeroCard() {
  const [activeTab, setActiveTab] = useState(0);

  // Auto slide effect every 6 seconds to make the page feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group">
      {/* Refined backdrop shadow rotating behind card */}
      <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] rotate-2 scale-105 opacity-50 transition-transform duration-700 group-hover:rotate-1"></div>

      {/* Main Container Card - maintains aspect ratio */}
      <div className="relative w-80 md:w-96 aspect-[3.5/4.5] rounded-[2rem] overflow-hidden shadow-2xl bg-white p-2">
        
        {/* Slide 1: Dr. Selami Balcı Portrait */}
        <div 
          className={`absolute inset-2 rounded-[1.5rem] overflow-hidden transition-all duration-700 ease-in-out ${
            activeTab === 0 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"
          }`}
        >
          <img
            src="/dr-selami-balci.jpg"
            alt="Dr. Selami Balcı"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-85"></div>

          {/* Overlay Content */}
          <div className="absolute bottom-12 left-8 right-8 text-white text-left">
            <p className="font-serif text-3xl font-bold tracking-tight">Dr. Selami Balcı</p>
            <div className="h-1 w-12 bg-accent-500 my-2 rounded-full"></div>
            <p className="text-white/90 text-sm font-medium tracking-wide uppercase">Şehircilik Uzmanı</p>
          </div>
        </div>

        {/* Slide 2: ParkExpert Kurumsal Görsel */}
        <div 
          className={`absolute inset-2 rounded-[1.5rem] overflow-hidden transition-all duration-700 ease-in-out bg-slate-950 ${
            activeTab === 1 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"
          }`}
        >
          <img
            src="/press/parkexpert_ad_mall_report.png"
            alt="ParkExpert Akıllı Otopark Teknolojileri"
            className="object-cover object-center w-full h-full opacity-90 hover:scale-105 transition duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

          {/* Overlay Content */}
          <div className="absolute bottom-12 left-8 right-8 text-white text-left">
            <p className="font-serif text-3xl font-bold tracking-tight">ParkExpert</p>
            <div className="h-1 w-12 bg-accent-500 my-2 rounded-full"></div>
            <p className="text-white/90 text-sm font-medium tracking-wide uppercase">Akıllı Otopark Girişimi</p>
          </div>
        </div>

        {/* Floating Tab Controller */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg z-20 flex gap-1 border border-white/40">
          <button 
            onClick={() => setActiveTab(0)}
            className={`text-[0.65rem] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full transition duration-300 ${
              activeTab === 0 
                ? 'bg-accent-700 text-white shadow-sm' 
                : 'text-slate-600 hover:text-accent-700 hover:bg-white/50'
            }`}
          >
            Biyografi
          </button>
          <button 
            onClick={() => setActiveTab(1)}
            className={`text-[0.65rem] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full transition duration-300 ${
              activeTab === 1 
                ? 'bg-accent-700 text-white shadow-sm' 
                : 'text-slate-600 hover:text-accent-700 hover:bg-white/50'
            }`}
          >
            ParkExpert
          </button>
        </div>

      </div>
    </div>
  );
}
