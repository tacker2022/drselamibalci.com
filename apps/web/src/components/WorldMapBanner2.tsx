"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapPin {
  id: number;
  country: string;
  city: string;
  description: string;
  year?: string;
  coordinates: [number, number]; // [lng, lat]
  category: "otopark" | "enerji" | "egitim";
}

const PINS: MapPin[] = [
  { id: 1, country: "Suudi Arabistan", city: "Riyadh", description: "Riyadh Şehri Modern Otopark Sistemi Kurulması", coordinates: [46.7, 24.7], category: "otopark" },
  { id: 2, country: "Pakistan", city: "Lahore", description: "Lahore Şehri Otopark İşletim Sistemi Kurulması", coordinates: [74.3, 31.5], category: "otopark" },
  { id: 3, country: "Mısır", city: "Kahire", description: "Kahire Şehri Otopark İşletim Sistemi Kurulması", coordinates: [31.2, 30.0], category: "otopark" },
  { id: 4, country: "Fas", city: "Rabat", description: "Rabat Şehri Otopark İşletim Sistemi Kurulması", coordinates: [-6.8, 34.0], category: "otopark" },
  { id: 5, country: "Arnavutluk", city: "Tiran", description: "Tiran Şehri Otopark İşletim Sistemi Kurulması", coordinates: [19.8, 41.3], category: "otopark" },
  { id: 6, country: "Romanya", city: "Bükreş", description: "Distri Gas, Bükreş Ve Tichilesti Şehirleri Fizibilite Projesi", year: "2007, 2010", coordinates: [26.1, 44.4], category: "enerji" },
  { id: 7, country: "Makedonya", city: "Üsküp", description: "Üsküp Büyükşehir Belediyesi Doğalgaz Fizibilite Projesi", year: "2006", coordinates: [21.4, 42.0], category: "enerji" },
  { id: 8, country: "İskoçya", city: "Glasgow", description: "Cardonald College Uluslararası Uygulamalı Eğitim İşbirliği Projesi", year: "2008–2010", coordinates: [-4.3, 55.9], category: "egitim" },
  { id: 9, country: "Fransa", city: "Paris", description: "Gas De France Uygulamalı Doğal Gaz Eğitimi", year: "2007", coordinates: [2.3, 48.9], category: "enerji" },
  { id: 10, country: "Suudi Arabistan", city: "Cidde", description: "Kral Abdülaziz Üniversitesi Doğal Gaz Eğitim Ve Laboratuvar Merkezi", year: "2009–2010", coordinates: [39.2, 21.5], category: "enerji" },
  { id: 11, country: "Almanya", city: "Duisburg", description: "SLV Ve Enerji Verimlilik Kurumları Uzaktan Eğitim Ve Kaynakçı Eğitimleri", year: "2009–2010", coordinates: [6.8, 51.4], category: "egitim" },
  { id: 12, country: "Bosna Hersek", city: "Saraybosna", description: "Gaz Araştırmaları Merkezi, Sempozyum Organizasyon Ve Bildiri Yayınlanması", year: "2009", coordinates: [18.4, 43.8], category: "enerji" },
];

const ISTANBUL_COORDS: [number, number] = [29.0, 41.0];

const CATEGORY_COLORS: Record<MapPin["category"], { dot: string; ring: string; label: string; bg: string }> = {
  otopark: { dot: "#2dd4bf", ring: "rgba(45,212,191,0.2)", label: "Otopark Projesi", bg: "rgba(45,212,191,0.08)" },
  enerji:  { dot: "#fb923c", ring: "rgba(251,146,60,0.2)",  label: "Enerji Projesi",   bg: "rgba(251,146,60,0.08)"  },
  egitim:  { dot: "#c084fc", ring: "rgba(192,132,252,0.2)", label: "Eğitim İşbirliği", bg: "rgba(192,132,252,0.08)" },
};

const STATS = [
  { value: "12", label: "Uluslararası Proje" },
  { value: "11", label: "Ülke" },
  { value: "3", label: "Kıta" },
  { value: "20+", label: "Yıllık Deneyim" },
];

// ── CUSTOM COMPONENT TO RENDER BEZIER CURVE ARCS ──
interface ConnectionArcsProps {
  pins: MapPin[];
  activePin: MapPin | null;
}

function ConnectionArcs({ pins, activePin }: ConnectionArcsProps) {
  const { projection } = useMapContext();

  if (!projection) return null;

  const [x1, y1] = projection(ISTANBUL_COORDS);

  return (
    <g pointerEvents="none">
      {pins.map((pin) => {
        const [x2, y2] = projection(pin.coordinates);
        const col = CATEGORY_COLORS[pin.category];

        // Draw Bezier Curves bowing upwards
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);

        if (len < 5) return null; // skip tiny connections

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        // Curve offsets
        const px = mx - (dy / len) * (len * 0.16);
        const py = my + (dx / len) * (len * 0.16) - len * 0.14;

        const pathData = `M ${x1} ${y1} Q ${px} ${py} ${x2} ${y2}`;
        const isFocused = activePin === null || activePin.id === pin.id;

        return (
          <g key={pin.id}>
            {/* Background dashed connection line */}
            <path
              d={pathData}
              fill="none"
              stroke={col.dot}
              strokeWidth={activePin?.id === pin.id ? 1.5 : 0.8}
              strokeOpacity={isFocused ? 0.22 : 0.05}
              strokeDasharray="3 3"
              style={{ transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease" }}
            />

            {/* Glowing dash animation */}
            <path
              d={pathData}
              fill="none"
              stroke={col.dot}
              strokeWidth={activePin?.id === pin.id ? 2.5 : 1.2}
              strokeOpacity={isFocused ? 0.65 : 0.1}
              strokeDasharray="16 110"
              className="map-arc-dash"
              style={{
                animation: `mapArcTravel 3s linear infinite`,
                animationDelay: `${pin.id * 0.25}s`,
                transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease"
              }}
            />
          </g>
        );
      })}
    </g>
  );
}

export default function WorldMapBanner2() {
  const [activePin, setActivePin] = useState<MapPin | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"tümü" | MapPin["category"]>("tümü");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtered pins for both rendering on map and showing list
  const filteredPins = useMemo(() => {
    return PINS.filter(
      (pin) => selectedCategory === "tümü" || pin.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border border-slate-800"
      style={{
        background: "linear-gradient(135deg, #050912 0%, #0b1122 50%, #04070e 100%)",
        boxShadow: "0 0 60px rgba(251,191,36,0.02), 0 35px 80px rgba(0,0,0,0.8)",
      }}
      onClick={() => setActivePin(null)}
    >
      {/* Self-contained CSS Animation style for arcs */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mapArcTravel {
          from {
            stroke-dashoffset: 126;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}} />

      {/* Decorative Radial Grid Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="flex flex-col lg:flex-row min-h-[480px]">

        {/* ── LEFT PANE: DESCRIPTION & TABS ── */}
        <div className="w-full lg:w-[32%] flex flex-col justify-between p-6 lg:p-8 lg:border-r border-slate-900 z-10">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-amber-500/80 text-[10px] font-bold tracking-[0.2em] uppercase">
                Küresel Faaliyet Ağı
              </span>
            </div>
            
            <h2 className="text-white text-2xl font-bold font-serif leading-tight">
              Uluslararası Proje &amp; İşbirlikleri
            </h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              Dr. Selami Balcı'nın öncülüğünü üstlendiği 4 farklı kıtadaki global operasyon ağ haritası
            </p>
          </div>

          {/* Details / Stats Dynamic display */}
          <div className="my-6">
            {activePin ? (
              /* Selected Project detail panel */
              <div 
                className="rounded-2xl p-5 border border-slate-800 bg-slate-950/60 backdrop-blur-md space-y-4 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: CATEGORY_COLORS[activePin.category].bg,
                      color: CATEGORY_COLORS[activePin.category].dot,
                      border: `1px solid ${CATEGORY_COLORS[activePin.category].dot}30`
                    }}
                  >
                    {CATEGORY_COLORS[activePin.category].label}
                  </div>
                  {activePin.year && (
                    <span className="ml-auto text-[9px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full font-semibold">
                      {activePin.year}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold block">{activePin.city}</h3>
                  <span className="text-slate-400 text-xs font-medium">{activePin.country}</span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed font-light">
                  {activePin.description}
                </p>

                <button
                  onClick={() => setActivePin(null)}
                  className="w-full text-center py-2 rounded-xl text-amber-500/70 hover:text-amber-400 hover:bg-amber-500/5 border border-amber-500/10 text-xs font-bold transition-all duration-200"
                >
                  ← İstatistikleri Gör
                </button>
              </div>
            ) : (
              /* Global Stats Grid */
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((stat) => (
                  <div 
                    key={stat.label} 
                    className="bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 text-center flex flex-col justify-center shadow-md hover:border-slate-800 transition duration-200"
                  >
                    <div className="text-2xl font-bold font-serif text-amber-400">
                      {mounted ? stat.value : "–"}
                    </div>
                    <div className="text-slate-500 text-[9px] font-medium uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filtering Legend Tabs */}
          <div className="space-y-3">
            <span className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              Kategori Filtresi
            </span>
            <div className="flex flex-col gap-1.5">
              {(["tümü", "otopark", "enerji", "egitim"] as const).map((cat) => {
                const isActive = selectedCategory === cat;
                const c = cat !== "tümü" ? CATEGORY_COLORS[cat] : null;

                return (
                  <button
                    key={cat}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(cat);
                      setActivePin(null);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left text-xs font-medium transition-all duration-200 border"
                    style={{
                      background: isActive ? (c ? c.bg : "rgba(255,255,255,0.04)") : "transparent",
                      borderColor: isActive ? (c ? `${c.dot}40` : "rgba(255,255,255,0.15)") : "transparent",
                      color: isActive ? "#ffffff" : "#64748b",
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: c ? c.dot : "#94a3b8",
                        boxShadow: c ? `0 0 5px ${c.dot}` : "none",
                      }}
                    />
                    <span className="capitalize">{cat === "tümü" ? "Tümü" : cat === "egitim" ? "Eğitim İşbirlikleri" : `${cat} Projeleri`}</span>
                    {isActive && (
                      <span className="ml-auto text-[9px] font-semibold text-amber-400/80 uppercase">Aktif</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── RIGHT PANE: MAP CANVAS ── */}
        <div className="flex-1 relative flex flex-col justify-between p-4 lg:p-6 select-none bg-slate-950/20">
          
          <div className="w-full h-full flex items-center justify-center">
            <ComposableMap
              projectionConfig={{
                scale: 210,
                center: [28, 37],
              }}
              style={{ width: "100%", height: "auto" }}
              viewBox="0 115 900 295"
            >
              <defs>
                {/* Glow Filter for pins */}
                <filter id="mapPinGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* World Geographies (Outlines) */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="rgba(255, 255, 255, 0.012)"
                      stroke="rgba(251, 191, 36, 0.065)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "fill 0.2s ease" },
                        hover:   { outline: "none", fill: "rgba(251, 191, 36, 0.03)" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Connecting Arcs from Istanbul */}
              {mounted && (
                <ConnectionArcs pins={filteredPins} activePin={activePin} />
              )}

              {/* Center Marker: Istanbul (Golden HQ Star) */}
              {mounted && (
                <Marker coordinates={ISTANBUL_COORDS}>
                  {/* Outer pulse */}
                  <circle r={12} fill="rgba(251, 191, 36, 0.15)" className="animate-ping" style={{ animationDuration: "2s" }} />
                  <circle r={7} fill="none" stroke="#fbbf24" strokeWidth={0.8} />
                  <circle r={3.5} fill="#fbbf24" filter="url(#mapPinGlow)" />
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 8,
                      fontWeight: 800,
                      fill: "#fbbf24",
                      textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                    }}
                  >
                    İstanbul (Merkez)
                  </text>
                </Marker>
              )}

              {/* Project Markers */}
              {mounted &&
                filteredPins.map((pin) => {
                  const isActive = activePin?.id === pin.id;
                  const col = CATEGORY_COLORS[pin.category];
                  const isDimmed = activePin !== null && activePin.id !== pin.id;

                  return (
                    <Marker
                      key={pin.id}
                      coordinates={pin.coordinates}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePin(isActive ? null : pin);
                      }}
                    >
                      {/* Pulse ring */}
                      <circle
                        r={isActive ? 16 : 9}
                        fill={col.ring}
                        style={{ 
                          cursor: "pointer", 
                          opacity: isDimmed ? 0.2 : 0.8,
                          transition: "all 0.25s ease" 
                        }}
                      />
                      {/* Core beacon dot */}
                      <circle
                        r={isActive ? 5.5 : 3.5}
                        fill={col.dot}
                        stroke="#ffffff"
                        strokeWidth={isActive ? 1.5 : 0.7}
                        filter="url(#mapPinGlow)"
                        style={{
                          cursor: "pointer",
                          opacity: isDimmed ? 0.4 : 1,
                          transition: "all 0.25s ease",
                        }}
                      />
                      {/* Label */}
                      <text
                        textAnchor="middle"
                        y={isActive ? -14 : -11}
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: isActive ? 8.5 : 7,
                          fontWeight: 700,
                          fill: isActive ? col.dot : "rgba(255, 255, 255, 0.75)",
                          opacity: isDimmed ? 0.35 : 1,
                          pointerEvents: "none",
                          transition: "all 0.25s ease",
                          textShadow: "0 1px 4px rgba(0,0,0,0.95)",
                        }}
                      >
                        {pin.city}
                      </text>
                    </Marker>
                  );
                })}
            </ComposableMap>
          </div>

          {/* Bottom City Pill Selection list */}
          <div className="w-full flex flex-wrap gap-2 items-center border-t border-slate-900/60 pt-4 mt-2">
            <span className="text-slate-600 text-[9px] uppercase tracking-wider font-bold mr-1">
              Proje Listesi:
            </span>
            {filteredPins.map((pin) => {
              const isActive = activePin?.id === pin.id;
              const col = CATEGORY_COLORS[pin.category];
              return (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePin(isActive ? null : pin);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? `${col.dot}22` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${isActive ? col.dot : "rgba(255,255,255,0.05)"}`,
                    color: isActive ? col.dot : "rgba(255,255,255,0.45)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                    style={{ backgroundColor: col.dot }}
                  />
                  {pin.city}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
