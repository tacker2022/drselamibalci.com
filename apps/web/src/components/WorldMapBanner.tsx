"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapPin {
  id: number;
  country: string;
  city: string;
  description: string;
  year?: string;
  coordinates: [number, number];
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

const CATEGORY_COLORS: Record<MapPin["category"], { dot: string; ring: string; label: string }> = {
  otopark: { dot: "#14b8a6", ring: "rgba(20,184,166,0.25)", label: "Otopark Projesi" },
  enerji:  { dot: "#f59e0b", ring: "rgba(245,158,11,0.25)",  label: "Enerji Projesi" },
  egitim:  { dot: "#818cf8", ring: "rgba(129,140,248,0.25)", label: "Eğitim İşbirliği" },
};

const STATS = [
  { value: "12", label: "Uluslararası Proje" },
  { value: "11", label: "Ülke" },
  { value: "3", label: "Kıta" },
  { value: "20+", label: "Yıllık Deneyim" },
];

export default function WorldMapBanner() {
  const [activePin, setActivePin] = useState<MapPin | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d1f2d 40%, #0a2420 100%)",
        border: "1px solid rgba(20,184,166,0.2)",
      }}
      onClick={() => setActivePin(null)}
    >
      {/* Subtle radial glow in top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(20,184,166,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(129,140,248,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP HEADER SECTION ── */}
      <div className="px-6 pt-6 pb-4 md:px-10 md:pt-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          {/* Left: Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
              </span>
              <span className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase">
                Küresel Faaliyet Haritası
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold font-serif leading-tight">
              Uluslararası Proje & <br className="hidden md:block" />İşbirlik Ağı
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Dr. Selami Balcı'nın 4 kıtada yürüttüğü projeler
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex gap-4 md:gap-6 flex-wrap">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-bold font-serif"
                  style={{ color: "#14b8a6" }}
                >
                  {mounted ? stat.value : "–"}
                </div>
                <div className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-5 flex-wrap">
          {Object.entries(CATEGORY_COLORS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: val.dot, boxShadow: `0 0 6px ${val.dot}` }}
              />
              <span className="text-slate-400 text-xs font-medium">{val.label}</span>
            </div>
          ))}
          <span className="text-slate-600 text-xs ml-auto hidden md:block">
            Noktalara tıklayarak detay görün →
          </span>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.25), transparent)" }} />

      {/* ── MAP ── */}
      <div className="relative">
        <ComposableMap
          projectionConfig={{
            scale: 195,
            center: [28, 38],
          }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 900 440"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(20,184,166,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(255,255,255,0.045)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={0.45}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none", fill: "rgba(20,184,166,0.09)" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {PINS.map((pin) => {
            const isActive = activePin?.id === pin.id;
            const col = CATEGORY_COLORS[pin.category];
            return (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(isActive ? null : pin);
                }}
              >
                {/* Outer pulse ring */}
                <circle
                  r={isActive ? 18 : 12}
                  fill={col.ring}
                  style={{ cursor: "pointer", transition: "r 0.2s ease" }}
                />
                {/* Mid ring */}
                <circle
                  r={isActive ? 9 : 6}
                  fill={col.ring}
                  style={{ cursor: "pointer" }}
                />
                {/* Core dot */}
                <circle
                  r={isActive ? 5.5 : 3.5}
                  fill={col.dot}
                  stroke="white"
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{
                    cursor: "pointer",
                    filter: `drop-shadow(0 0 ${isActive ? 8 : 5}px ${col.dot})`,
                    transition: "all 0.2s ease",
                  }}
                />
                {/* City label */}
                <text
                  textAnchor="middle"
                  y={-13}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: isActive ? 8.5 : 7,
                    fontWeight: 700,
                    fill: isActive ? col.dot : "rgba(255,255,255,0.72)",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  {pin.city}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Active pin detail card – positioned inside map area */}
        {activePin && (
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ width: 300 }}
          >
            <div
              className="rounded-2xl px-5 py-4 shadow-2xl"
              style={{
                background: "rgba(10,22,40,0.97)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${CATEGORY_COLORS[activePin.category].dot}40`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: CATEGORY_COLORS[activePin.category].dot,
                    boxShadow: `0 0 6px ${CATEGORY_COLORS[activePin.category].dot}`,
                  }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: CATEGORY_COLORS[activePin.category].dot }}
                >
                  {activePin.country}
                </span>
                {activePin.year && (
                  <span className="ml-auto text-[9px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-semibold">
                    {activePin.year}
                  </span>
                )}
              </div>
              <p className="text-white font-bold text-sm">{activePin.city}</p>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed font-light">
                {activePin.description}
              </p>
              <div
                className="mt-2.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: CATEGORY_COLORS[activePin.category].dot }}
              >
                {CATEGORY_COLORS[activePin.category].label}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM CITY PILL ROW ── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.2), transparent)" }} />
      <div className="px-6 py-4 md:px-10 flex flex-wrap gap-2 items-center">
        <span className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold mr-1">
          Projeler:
        </span>
        {PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={(e) => {
              e.stopPropagation();
              setActivePin(activePin?.id === pin.id ? null : pin);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
            style={{
              background:
                activePin?.id === pin.id
                  ? `${CATEGORY_COLORS[pin.category].dot}22`
                  : "rgba(255,255,255,0.05)",
              border: `1px solid ${
                activePin?.id === pin.id
                  ? CATEGORY_COLORS[pin.category].dot
                  : "rgba(255,255,255,0.1)"
              }`,
              color:
                activePin?.id === pin.id
                  ? CATEGORY_COLORS[pin.category].dot
                  : "rgba(255,255,255,0.5)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[pin.category].dot }}
            />
            {pin.city}
          </button>
        ))}
      </div>
    </div>
  );
}
