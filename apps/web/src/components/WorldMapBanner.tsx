"use client";

import { useState } from "react";

interface MapPin {
  id: number;
  country: string;
  city: string;
  description: string;
  year?: string;
  // SVG percentage coordinates (0-100 for x, 0-100 for y) based on a standard equirectangular projection
  x: number;
  y: number;
}

const PINS: MapPin[] = [
  { id: 1, country: "Suudi Arabistan", city: "Riyadh", description: "Riyadh Şehri Modern Otopark Sistemi Kurulması", x: 56.2, y: 42.5 },
  { id: 2, country: "Pakistan", city: "Lahore", description: "Lahore Şehri Otopark İşletim Sistemi Kurulması", x: 64.8, y: 37.2 },
  { id: 3, country: "Mısır", city: "Kahire", description: "Kahire Şehri Otopark İşletim Sistemi Kurulması", x: 52.4, y: 39.8 },
  { id: 4, country: "Fas", city: "Rabat", description: "Rabat Şehri Otopark İşletim Sistemi Kurulması", x: 42.8, y: 37.5 },
  { id: 5, country: "Arnavutluk", city: "Tiran", description: "Tiran Şehri Otopark İşletim Sistemi Kurulması", x: 50.1, y: 31.0 },
  { id: 6, country: "Romanya", city: "Bükreş", description: "Distri Gas, Bükreş Ve Tichilesti Şehirleri Fizibilite Projesi", year: "2007, 2010", x: 51.4, y: 29.2 },
  { id: 7, country: "Makedonya", city: "Üsküp", description: "Üsküp Büyükşehir Belediyesi Doğalgaz Fizibilite Projesi", year: "2006", x: 50.6, y: 30.2 },
  { id: 8, country: "İskoçya", city: "Glasgow", description: "Cardonald College Uluslararası Uygulamalı Eğitim İşbirliği Projesi", year: "2008–2010", x: 45.2, y: 24.5 },
  { id: 9, country: "Fransa", city: "Paris", description: "Gas De France Uygulamalı Doğal Gaz Eğitimi", year: "2007", x: 46.5, y: 27.8 },
  { id: 10, country: "Suudi Arabistan", city: "Cidde", description: "Kral Abdülaziz Üniversitesi Doğal Gaz Eğitim Ve Laboratuvar Merkezi Kurulması", year: "2009–2010", x: 55.0, y: 43.8 },
  { id: 11, country: "Almanya", city: "Duisburg", description: "SLV Ve Enerji Verimlilik Kurumları İle Uzaktan Eğitim Ve Kaynakçı Eğitimleri", year: "2009–2010", x: 47.6, y: 27.0 },
  { id: 12, country: "Bosna Hersek", city: "Saraybosna", description: "Gaz Araştırmaları Merkezi, Sempozyum Organizasyon Ve Bildiri Yayınlanması", year: "2009", x: 50.0, y: 29.8 },
];

export default function WorldMapBanner() {
  const [activePin, setActivePin] = useState<MapPin | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handlePinClick = (pin: MapPin, e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();
    if (activePin?.id === pin.id) {
      setActivePin(null);
    } else {
      setActivePin(pin);
      const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
      const svgX = (pin.x / 100) * rect.width;
      const svgY = (pin.y / 100) * rect.height;
      setTooltipPos({ x: svgX, y: svgY });
    }
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 shadow-2xl"
      style={{ minHeight: 320 }}
      onClick={() => setActivePin(null)}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px)",
        }}
      />

      {/* Label */}
      <div className="absolute top-4 left-5 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block" />
        <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">
          {PINS.length} Uluslararası Proje
        </span>
      </div>

      {/* SVG Map */}
      <svg
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ display: "block", minHeight: 280 }}
      >
        {/* World map path – simplified continents silhouette */}
        <g fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
          {/* Europe */}
          <path d="M430 110 L470 105 L490 100 L510 108 L505 120 L490 130 L480 145 L460 148 L445 140 L435 125 Z" />
          {/* Scandinavia */}
          <path d="M460 85 L475 75 L480 90 L470 100 L460 95 Z" />
          <path d="M475 75 L490 65 L495 80 L480 90 Z" />
          {/* British Isles */}
          <path d="M430 105 L440 95 L445 108 L435 115 Z" />
          <path d="M435 115 L445 108 L448 125 L438 128 Z" />
          {/* Iberian Peninsula */}
          <path d="M420 130 L440 125 L445 145 L425 150 Z" />
          {/* France */}
          <path d="M440 125 L465 120 L468 140 L445 145 Z" />
          {/* Central Europe */}
          <path d="M465 120 L490 115 L495 135 L468 140 Z" />
          {/* Italy */}
          <path d="M468 140 L480 138 L484 155 L472 160 L465 150 Z" />
          {/* Balkans */}
          <path d="M490 130 L510 125 L515 145 L495 150 Z" />
          {/* Greece */}
          <path d="M500 145 L512 142 L514 158 L502 160 Z" />

          {/* Africa */}
          <path d="M405 155 L465 150 L480 165 L490 185 L495 220 L490 255 L470 275 L450 280 L425 268 L410 245 L405 215 L400 185 Z" />
          {/* North Africa */}
          <path d="M405 155 L465 150 L475 165 L490 165 L510 160 L540 158 L540 185 L510 190 L480 188 L455 190 L430 190 L405 185 Z" />

          {/* Middle East */}
          <path d="M510 155 L545 150 L570 155 L575 175 L560 185 L530 180 L510 175 Z" />
          {/* Arabian Peninsula */}
          <path d="M530 175 L570 170 L580 185 L575 210 L555 220 L535 215 L525 200 Z" />

          {/* Asia */}
          {/* Turkey */}
          <path d="M505 130 L540 125 L550 138 L520 145 L505 140 Z" />
          {/* Caucasus */}
          <path d="M540 125 L565 120 L570 135 L548 140 Z" />
          {/* Central Asia */}
          <path d="M565 110 L640 100 L660 120 L640 140 L600 145 L568 138 Z" />
          {/* South Asia */}
          <path d="M600 145 L660 140 L670 165 L655 185 L640 195 L620 185 L605 165 Z" />
          {/* India */}
          <path d="M620 185 L650 180 L655 215 L640 235 L625 230 L615 210 Z" />
          {/* Southeast Asia */}
          <path d="M680 150 L730 145 L740 165 L725 175 L690 170 Z" />
          {/* East Asia */}
          <path d="M700 105 L780 95 L790 125 L760 140 L720 140 L700 125 Z" />
          {/* Japan */}
          <path d="M790 115 L800 108 L808 125 L795 130 Z" />

          {/* North America */}
          <path d="M60 80 L180 72 L200 90 L195 120 L175 140 L150 148 L120 145 L90 130 L65 110 Z" />
          {/* Central America */}
          <path d="M150 148 L170 145 L175 168 L158 175 L145 165 Z" />
          {/* Mexico */}
          <path d="M95 145 L150 148 L145 165 L118 170 L95 160 Z" />
          {/* Greenland */}
          <path d="M190 50 L240 42 L248 65 L225 75 L195 70 Z" />

          {/* South America */}
          <path d="M155 180 L205 172 L215 200 L218 240 L205 275 L185 295 L165 290 L150 260 L145 225 L148 200 Z" />
          {/* Brazil bulge */}
          <path d="M195 190 L230 188 L240 210 L225 230 L205 225 L195 210 Z" />

          {/* Australia */}
          <path d="M705 230 L790 225 L810 248 L805 280 L775 295 L730 292 L705 270 L700 248 Z" />
          {/* New Zealand */}
          <path d="M820 278 L830 268 L838 285 L825 295 Z" />

          {/* Russia */}
          <path d="M510 80 L700 65 L750 80 L760 100 L700 105 L640 100 L565 110 L520 105 Z" />
          {/* Siberia east */}
          <path d="M760 65 L840 58 L860 80 L840 95 L800 95 L760 80 Z" />
        </g>

        {/* Meridian / parallels faint lines */}
        <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* Pins */}
        {PINS.map((pin) => {
          const cx = (pin.x / 100) * 1000;
          const cy = (pin.y / 100) * 500;
          const isActive = activePin?.id === pin.id;
          return (
            <g
              key={pin.id}
              style={{ cursor: "pointer" }}
              onClick={(e) => handlePinClick(pin, e)}
            >
              {/* Outer pulse ring */}
              <circle cx={cx} cy={cy} r={isActive ? 20 : 14} fill="rgba(20,184,166,0.15)" className={isActive ? "" : "animate-ping-slow"} />
              {/* Mid ring */}
              <circle cx={cx} cy={cy} r={isActive ? 12 : 8} fill="rgba(20,184,166,0.25)" />
              {/* Core dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 6 : 4}
                fill={isActive ? "#14b8a6" : "#5eead4"}
                stroke="white"
                strokeWidth={isActive ? 2 : 1}
                style={{ filter: isActive ? "drop-shadow(0 0 6px #14b8a6)" : "drop-shadow(0 0 3px #5eead4)" }}
              />
              {/* City label (always visible, small) */}
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="8"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {pin.city}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {activePin && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `calc(${activePin.x}% + 12px)`,
            top: `calc(${activePin.y}% - 30px)`,
            transform: activePin.x > 70 ? "translateX(-110%)" : "translateX(0)",
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-teal-500/30 rounded-xl px-4 py-3 shadow-2xl w-64">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
              <span className="text-teal-300 text-xs font-bold uppercase tracking-wider">{activePin.country}</span>
              {activePin.year && (
                <span className="ml-auto text-[10px] text-slate-400 font-medium bg-slate-700 px-1.5 py-0.5 rounded">
                  {activePin.year}
                </span>
              )}
            </div>
            <p className="text-white font-semibold text-sm leading-snug">{activePin.city}</p>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{activePin.description}</p>
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div className="absolute bottom-3 right-5 text-slate-500 text-[10px] font-medium tracking-wide pointer-events-none">
        Noktalara tıklayarak detayları görün
      </div>

      <style>{`
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
