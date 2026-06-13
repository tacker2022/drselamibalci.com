"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapPin {
  id: number;
  country: string;
  city: string;
  description: string;
  year?: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const PINS: MapPin[] = [
  { id: 1, country: "Suudi Arabistan", city: "Riyadh", description: "Riyadh Şehri Modern Otopark Sistemi Kurulması", coordinates: [46.7, 24.7] },
  { id: 2, country: "Pakistan", city: "Lahore", description: "Lahore Şehri Otopark İşletim Sistemi Kurulması", coordinates: [74.3, 31.5] },
  { id: 3, country: "Mısır", city: "Kahire", description: "Kahire Şehri Otopark İşletim Sistemi Kurulması", coordinates: [31.2, 30.0] },
  { id: 4, country: "Fas", city: "Rabat", description: "Rabat Şehri Otopark İşletim Sistemi Kurulması", coordinates: [-6.8, 34.0] },
  { id: 5, country: "Arnavutluk", city: "Tiran", description: "Tiran Şehri Otopark İşletim Sistemi Kurulması", coordinates: [19.8, 41.3] },
  { id: 6, country: "Romanya", city: "Bükreş", description: "Distri Gas Fizibilite Projesi", year: "2007, 2010", coordinates: [26.1, 44.4] },
  { id: 7, country: "Makedonya", city: "Üsküp", description: "Üsküp Büyükşehir Belediyesi Doğalgaz Fizibilite Projesi", year: "2006", coordinates: [21.4, 42.0] },
  { id: 8, country: "İskoçya", city: "Glasgow", description: "Cardonald College Uluslararası Uygulamalı Eğitim İşbirliği", year: "2008–2010", coordinates: [-4.3, 55.9] },
  { id: 9, country: "Fransa", city: "Paris", description: "Gas De France Uygulamalı Doğal Gaz Eğitimi", year: "2007", coordinates: [2.3, 48.9] },
  { id: 10, country: "Suudi Arabistan", city: "Cidde", description: "Kral Abdülaziz Üniversitesi Doğal Gaz Eğitim Merkezi", year: "2009–2010", coordinates: [39.2, 21.5] },
  { id: 11, country: "Almanya", city: "Duisburg", description: "SLV Uzaktan Eğitim Ve Kaynakçı Eğitimleri", year: "2009–2010", coordinates: [6.8, 51.4] },
  { id: 12, country: "Bosna Hersek", city: "Saraybosna", description: "Gaz Araştırmaları Merkezi Sempozyum", year: "2009", coordinates: [18.4, 43.8] },
];

export default function WorldMapBanner() {
  const [activePin, setActivePin] = useState<MapPin | null>(null);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1f2d] to-teal-950 shadow-2xl"
      onClick={() => setActivePin(null)}
    >
      {/* Top badge */}
      <div className="absolute top-4 left-5 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block" />
        <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">
          {PINS.length} Uluslararası Proje
        </span>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-3 right-5 z-10 text-slate-500 text-[10px] font-medium tracking-wide pointer-events-none">
        Noktalara tıklayarak detayları görün
      </div>

      {/* The Map */}
      <ComposableMap
        projectionConfig={{ scale: 147, center: [25, 30] }}
        style={{ width: "100%", height: "auto" }}
        viewBox="0 0 800 420"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "rgba(20,184,166,0.1)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {PINS.map((pin) => {
          const isActive = activePin?.id === pin.id;
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
                r={isActive ? 14 : 9}
                fill={isActive ? "rgba(20,184,166,0.25)" : "rgba(94,234,212,0.15)"}
                style={{ cursor: "pointer" }}
              />
              {/* Inner dot */}
              <circle
                r={isActive ? 6 : 4}
                fill={isActive ? "#14b8a6" : "#5eead4"}
                stroke="white"
                strokeWidth={isActive ? 1.5 : 0.8}
                style={{
                  cursor: "pointer",
                  filter: `drop-shadow(0 0 ${isActive ? 7 : 4}px #14b8a6)`,
                }}
              />
              {/* City name label */}
              <text
                textAnchor="middle"
                y={-12}
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 7,
                  fontWeight: 700,
                  fill: isActive ? "#5eead4" : "rgba(255,255,255,0.7)",
                  pointerEvents: "none",
                }}
              >
                {pin.city}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Floating tooltip */}
      {activePin && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-72">
          <div className="bg-slate-900/96 backdrop-blur-md border border-teal-500/30 rounded-2xl px-5 py-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
              <span className="text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                {activePin.country}
              </span>
              {activePin.year && (
                <span className="ml-auto text-[9px] text-slate-400 bg-slate-700/80 px-1.5 py-0.5 rounded font-medium">
                  {activePin.year}
                </span>
              )}
            </div>
            <p className="text-white font-bold text-sm">{activePin.city}</p>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{activePin.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
