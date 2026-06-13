"use client";

import { useEffect, useRef, useState } from "react";

interface GlobePin {
  country: string;
  city: string;
  description: string;
  year?: string;
  lat: number; // degrees
  lng: number; // degrees
}

const GLOBE_PINS: GlobePin[] = [
  { country: "Suudi Arabistan", city: "Riyadh", description: "Riyadh Şehri Modern Otopark Sistemi Kurulması", lat: 24.7, lng: 46.7 },
  { country: "Pakistan", city: "Lahore", description: "Lahore Şehri Otopark İşletim Sistemi Kurulması", lat: 31.5, lng: 74.3 },
  { country: "Mısır", city: "Kahire", description: "Kahire Şehri Otopark İşletim Sistemi Kurulması", lat: 30.0, lng: 31.2 },
  { country: "Fas", city: "Rabat", description: "Rabat Şehri Otopark İşletim Sistemi Kurulması", lat: 34.0, lng: -6.8 },
  { country: "Arnavutluk", city: "Tiran", description: "Tiran Şehri Otopark İşletim Sistemi Kurulması", lat: 41.3, lng: 19.8 },
  { country: "Romanya", city: "Bükreş", description: "Distri Gas Fizibilite Projesi", year: "2007, 2010", lat: 44.4, lng: 26.1 },
  { country: "Makedonya", city: "Üsküp", description: "Üsküp Büyükşehir Belediyesi Doğalgaz Fizibilite Projesi", year: "2006", lat: 42.0, lng: 21.4 },
  { country: "İskoçya", city: "Glasgow", description: "Cardonald College Uluslararası Eğitim İşbirliği Projesi", year: "2008–2010", lat: 55.9, lng: -4.3 },
  { country: "Fransa", city: "Paris", description: "Gas De France Uygulamalı Doğal Gaz Eğitimi", year: "2007", lat: 48.9, lng: 2.3 },
  { country: "Suudi Arabistan", city: "Cidde", description: "Kral Abdülaziz Üniversitesi Doğal Gaz Eğitim Merkezi", year: "2009–2010", lat: 21.5, lng: 39.2 },
  { country: "Almanya", city: "Duisburg", description: "SLV Uzaktan Eğitim Ve Kaynakçı Eğitimleri", year: "2009–2010", lat: 51.4, lng: 6.8 },
  { country: "Bosna Hersek", city: "Saraybosna", description: "Gaz Araştırmaları Merkezi Sempozyum", year: "2009", lat: 43.8, lng: 18.4 },
];

function latLngToXY(lat: number, lng: number, rotY: number, size: number): { x: number; y: number; visible: boolean } {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotY) * (Math.PI / 180);
  const x = Math.sin(phi) * Math.cos(theta);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);
  const visible = z > -0.2;
  const R = size / 2;
  return {
    x: R + x * R * 0.95,
    y: R - y * R * 0.95,
    visible,
  };
}

export default function InteractiveGlobe() {
  const [rotY, setRotY] = useState(20);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; rotY: number } | null>(null);
  const animRef = useRef<number | null>(null);
  const [activePin, setActivePin] = useState<GlobePin | null>(null);
  const size = 420;

  // Auto-rotate when not dragging
  useEffect(() => {
    if (dragging) return;
    animRef.current = window.setInterval(() => {
      setRotY((r) => (r + 0.18) % 360);
    }, 16);
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [dragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, rotY };
    if (animRef.current) clearInterval(animRef.current);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    const delta = e.clientX - dragStart.current.x;
    setRotY((dragStart.current.rotY + delta * 0.4) % 360);
  };

  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    dragStart.current = { x: e.touches[0].clientX, rotY };
    if (animRef.current) clearInterval(animRef.current);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !dragStart.current) return;
    const delta = e.touches[0].clientX - dragStart.current.x;
    setRotY((dragStart.current.rotY + delta * 0.4) % 360);
  };

  // Generate lat/lng lines for the globe wireframe
  const latLines: string[] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const points: string[] = [];
    for (let lng = -180; lng <= 180; lng += 4) {
      const p = latLngToXY(lat, lng, rotY, size);
      if (p.visible) points.push(`${p.x},${p.y}`);
    }
    if (points.length > 2) latLines.push(points.join(" "));
  }

  const lngLines: string[] = [];
  for (let lng = 0; lng < 360; lng += 30) {
    const points: string[] = [];
    for (let lat = -80; lat <= 80; lat += 4) {
      const p = latLngToXY(lat, lng, rotY, size);
      if (p.visible) points.push(`${p.x},${p.y}`);
    }
    if (points.length > 2) lngLines.push(points.join(" "));
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 py-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block" />
          <span className="text-teal-600 text-xs font-bold tracking-widest uppercase">
            3D Küre Görünümü
          </span>
        </div>
        <p className="text-slate-400 text-sm font-light">Küreyi sürükleyerek döndürebilirsiniz</p>
      </div>

      <div className="relative" style={{ width: size, height: size, maxWidth: "100vw" }}>
        {/* Glow behind globe */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 38% 38%, rgba(20,184,166,0.18) 0%, rgba(15,118,110,0.08) 50%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ cursor: dragging ? "grabbing" : "grab", userSelect: "none", touchAction: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
          onClick={() => setActivePin(null)}
        >
          <defs>
            <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#134e4a" />
              <stop offset="60%" stopColor="#0f2030" />
              <stop offset="100%" stopColor="#060e18" />
            </radialGradient>
            <radialGradient id="specular" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} />
            </clipPath>
          </defs>

          {/* Globe base */}
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="url(#globeGrad)" />

          {/* Wireframe grid */}
          <g clipPath="url(#globeClip)">
            {latLines.map((pts, i) => (
              <polyline key={`lat-${i}`} points={pts} fill="none" stroke="rgba(20,184,166,0.12)" strokeWidth="0.7" />
            ))}
            {lngLines.map((pts, i) => (
              <polyline key={`lng-${i}`} points={pts} fill="none" stroke="rgba(20,184,166,0.12)" strokeWidth="0.7" />
            ))}
          </g>

          {/* Specular highlight */}
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="url(#specular)" />

          {/* Outer ring */}
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke="rgba(20,184,166,0.25)" strokeWidth="1.5" />

          {/* Pins */}
          {GLOBE_PINS.map((pin, idx) => {
            const pos = latLngToXY(pin.lat, pin.lng, rotY, size);
            if (!pos.visible) return null;
            const isActive = activePin?.city === pin.city;
            // Depth factor for size
            const phi = (90 - pin.lat) * (Math.PI / 180);
            const theta = (pin.lng + rotY) * (Math.PI / 180);
            const z = Math.sin(phi) * Math.sin(theta);
            const depthScale = 0.6 + 0.4 * ((z + 1) / 2);
            const r = (isActive ? 7 : 4.5) * depthScale;

            return (
              <g
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(isActive ? null : pin);
                }}
                style={{ cursor: "pointer" }}
              >
                {/* Pulse ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r * 2.5}
                  fill={isActive ? "rgba(20,184,166,0.25)" : "rgba(94,234,212,0.12)"}
                />
                {/* Dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={isActive ? "#14b8a6" : "#5eead4"}
                  stroke="white"
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{ filter: `drop-shadow(0 0 ${isActive ? 8 : 4}px #14b8a6)` }}
                />
                {/* City name */}
                <text
                  x={pos.x}
                  y={pos.y - r - 4}
                  textAnchor="middle"
                  fill={isActive ? "#5eead4" : "rgba(255,255,255,0.65)"}
                  fontSize={8 * depthScale}
                  fontFamily="system-ui, sans-serif"
                  fontWeight="700"
                  style={{ pointerEvents: "none" }}
                >
                  {pin.city}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip card */}
        {activePin && (() => {
          const pos = latLngToXY(activePin.lat, activePin.lng, rotY, size);
          return (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: pos.x + 14,
                top: pos.y - 24,
                transform: pos.x > size * 0.6 ? "translateX(-110%)" : "translateX(0)",
              }}
            >
              <div className="bg-slate-900/96 backdrop-blur-md border border-teal-500/30 rounded-2xl px-4 py-3 shadow-2xl w-60">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                  <span className="text-teal-300 text-[10px] font-bold uppercase tracking-wider">{activePin.country}</span>
                  {activePin.year && (
                    <span className="ml-auto text-[9px] text-slate-400 bg-slate-700/80 px-1.5 py-0.5 rounded font-medium">
                      {activePin.year}
                    </span>
                  )}
                </div>
                <p className="text-white font-bold text-sm">{activePin.city}</p>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed font-light">{activePin.description}</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Country count badges */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xl px-4">
        {GLOBE_PINS.map((pin, i) => (
          <button
            key={i}
            onClick={() => setActivePin(activePin?.city === pin.city ? null : pin)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
              activePin?.city === pin.city
                ? "bg-teal-600 border-teal-500 text-white shadow-lg"
                : "bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {pin.city}
          </button>
        ))}
      </div>
    </div>
  );
}
