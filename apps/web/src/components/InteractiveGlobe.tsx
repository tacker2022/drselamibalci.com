"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface GlobePin {
  country: string;
  city: string;
  description: string;
  year?: string;
  lat: number;
  lng: number;
  category: "otopark" | "enerji" | "egitim";
}

const GLOBE_PINS: GlobePin[] = [
  { country: "Suudi Arabistan", city: "Riyadh",     description: "Riyadh Şehri Modern Otopark Sistemi Kurulması",                          lat: 24.7, lng: 46.7,  category: "otopark" },
  { country: "Pakistan",        city: "Lahore",     description: "Lahore Şehri Otopark İşletim Sistemi Kurulması",                          lat: 31.5, lng: 74.3,  category: "otopark" },
  { country: "Mısır",           city: "Kahire",     description: "Kahire Şehri Otopark İşletim Sistemi Kurulması",                          lat: 30.0, lng: 31.2,  category: "otopark" },
  { country: "Fas",             city: "Rabat",      description: "Rabat Şehri Otopark İşletim Sistemi Kurulması",                           lat: 34.0, lng: -6.8,  category: "otopark" },
  { country: "Arnavutluk",      city: "Tiran",      description: "Tiran Şehri Otopark İşletim Sistemi Kurulması",                           lat: 41.3, lng: 19.8,  category: "otopark" },
  { country: "Romanya",         city: "Bükreş",     description: "Distri Gas, Bükreş Ve Tichilesti Şehirleri Fizibilite Projesi",            lat: 44.4, lng: 26.1,  category: "enerji",  year: "2007, 2010" },
  { country: "Makedonya",       city: "Üsküp",      description: "Üsküp Büyükşehir Belediyesi Doğalgaz Fizibilite Projesi",                  lat: 42.0, lng: 21.4,  category: "enerji",  year: "2006" },
  { country: "İskoçya",         city: "Glasgow",    description: "Cardonald College Uluslararası Uygulamalı Eğitim İşbirliği Projesi",       lat: 55.9, lng: -4.3,  category: "egitim",  year: "2008–2010" },
  { country: "Fransa",          city: "Paris",      description: "Gas De France Uygulamalı Doğal Gaz Eğitimi",                              lat: 48.9, lng: 2.3,   category: "enerji",  year: "2007" },
  { country: "Suudi Arabistan", city: "Cidde",      description: "Kral Abdülaziz Üniversitesi Doğal Gaz Eğitim Ve Laboratuvar Merkezi",      lat: 21.5, lng: 39.2,  category: "enerji",  year: "2009–2010" },
  { country: "Almanya",         city: "Duisburg",   description: "SLV Ve Enerji Verimlilik Kurumları Uzaktan Eğitim Ve Kaynakçı Eğitimleri", lat: 51.4, lng: 6.8,   category: "egitim",  year: "2009–2010" },
  { country: "Bosna Hersek",    city: "Saraybosna", description: "Gaz Araştırmaları Merkezi, Sempozyum Organizasyon Ve Bildiri Yayınlanması", lat: 43.8, lng: 18.4,  category: "enerji",  year: "2009" },
];

const CAT: Record<GlobePin["category"], { dot: string; glow: string; label: string; bg: string }> = {
  otopark: { dot: "#2dd4bf", glow: "rgba(45,212,191,0.6)",  label: "Otopark",  bg: "rgba(45,212,191,0.12)"  },
  enerji:  { dot: "#fbbf24", glow: "rgba(251,191,36,0.6)",  label: "Enerji",   bg: "rgba(251,191,36,0.12)"  },
  egitim:  { dot: "#a78bfa", glow: "rgba(167,139,250,0.6)", label: "Eğitim",   bg: "rgba(167,139,250,0.12)" },
};

// Deterministic star field (golden-ratio distribution, SSR-safe)
const STARS = Array.from({ length: 140 }, (_, i) => ({
  cx: ((i * 137.508) % 100),
  cy: ((i * 84.309)  % 100),
  r:  [0.5, 0.7, 0.9, 1.1][i % 4],
  op: [0.18, 0.28, 0.38, 0.22, 0.32][i % 5],
}));

function project(lat: number, lng: number, rotY: number, R: number, cx: number, cy: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotY) * (Math.PI / 180);
  const x3 =  Math.sin(phi) * Math.cos(theta);
  const z3 =  Math.sin(phi) * Math.sin(theta);
  const y3 =  Math.cos(phi);
  return {
    px: cx + x3 * R * 0.96,
    py: cy - y3 * R * 0.96,
    depth: z3,
    visible: z3 > -0.15,
  };
}

export default function InteractiveGlobe() {
  const SIZE = 520;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R  = SIZE / 2 - 6;

  const [rotY, setRotY]       = useState(62); // centered on Europe/Middle East
  const [dragging, setDragging] = useState(false);
  const [activePin, setActivePin] = useState<GlobePin | null>(null);
  const dragRef = useRef<{ x: number; rotY: number } | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);
    animRef.current = setInterval(() => setRotY(r => (r + 0.10) % 360), 16);
  }, []);

  const stopAuto = useCallback(() => {
    if (animRef.current) { clearInterval(animRef.current); animRef.current = null; }
  }, []);

  useEffect(() => { startAuto(); return () => stopAuto(); }, [startAuto, stopAuto]);

  // Mouse drag
  const onMouseDown  = (e: React.MouseEvent) => { stopAuto(); setDragging(true); dragRef.current = { x: e.clientX, rotY }; };
  const onMouseMove  = (e: React.MouseEvent) => { if (!dragging || !dragRef.current) return; setRotY((dragRef.current.rotY + (e.clientX - dragRef.current.x) * 0.35) % 360); };
  const onMouseUp    = () => { setDragging(false); startAuto(); };
  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => { stopAuto(); setDragging(true); dragRef.current = { x: e.touches[0].clientX, rotY }; };
  const onTouchMove  = (e: React.TouchEvent) => { if (!dragging || !dragRef.current) return; setRotY((dragRef.current.rotY + (e.touches[0].clientX - dragRef.current.x) * 0.35) % 360); };
  const onTouchEnd   = () => { setDragging(false); startAuto(); };

  // Grid lines
  const latLines: string[] = [];
  for (let lat = -70; lat <= 70; lat += 20) {
    const pts: string[] = [];
    for (let lng = -180; lng <= 180; lng += 3) {
      const p = project(lat, lng, rotY, R, CX, CY);
      if (p.visible) pts.push(`${p.px.toFixed(1)},${p.py.toFixed(1)}`);
    }
    if (pts.length > 1) latLines.push(pts.join(" "));
  }
  const lngLines: string[] = [];
  for (let lng = 0; lng < 360; lng += 20) {
    const pts: string[] = [];
    for (let lat = -80; lat <= 80; lat += 3) {
      const p = project(lat, lng, rotY, R, CX, CY);
      if (p.visible) pts.push(`${p.px.toFixed(1)},${p.py.toFixed(1)}`);
    }
    if (pts.length > 1) lngLines.push(pts.join(" "));
  }
  // Equator
  const equatorPts: string[] = [];
  for (let lng = -180; lng <= 180; lng += 2) {
    const p = project(0, lng, rotY, R, CX, CY);
    if (p.visible) equatorPts.push(`${p.px.toFixed(1)},${p.py.toFixed(1)}`);
  }

  // Visible pins sorted by depth
  const visiblePins = GLOBE_PINS
    .map(pin => ({ ...pin, ...project(pin.lat, pin.lng, rotY, R, CX, CY) }))
    .filter(p => p.visible)
    .sort((a, b) => a.depth - b.depth);

  const pinnedActive = activePin
    ? project(activePin.lat, activePin.lng, rotY, R, CX, CY)
    : null;

  return (
    <div
      className="w-full rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050d18 0%, #091524 50%, #060f1a 100%)",
        border: "1px solid rgba(45,212,191,0.15)",
        boxShadow: "0 0 60px rgba(20,184,166,0.08), 0 30px 80px rgba(0,0,0,0.6)",
      }}
      onClick={() => setActivePin(null)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-0">

        {/* ── GLOBE ── */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center p-8 lg:p-10"
          style={{ width: "100%", maxWidth: 600 }}
        >
          {/* Star field behind globe */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              {STARS.map((s, i) => (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r * 0.3} fill="white" opacity={s.op} />
              ))}
            </svg>
          </div>

          {/* Drag instruction */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-slate-500 text-[10px] font-medium tracking-widest uppercase flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3"/></svg>
              Sürükle &amp; Döndür
            </span>
          </div>

          {/* Globe SVG */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{
              cursor: dragging ? "grabbing" : "grab",
              userSelect: "none",
              touchAction: "none",
              filter: "drop-shadow(0 0 40px rgba(20,184,166,0.12))",
              maxWidth: "100%",
              height: "auto",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={e => { if ((e.target as SVGElement).tagName === "svg" || (e.target as SVGElement).tagName === "circle") setActivePin(null); }}
          >
            <defs>
              <radialGradient id="igSurface" cx="36%" cy="32%" r="70%">
                <stop offset="0%"   stopColor="#173a4e" />
                <stop offset="35%"  stopColor="#0d2535" />
                <stop offset="70%"  stopColor="#071622" />
                <stop offset="100%" stopColor="#030a10" />
              </radialGradient>
              <radialGradient id="igSpecular" cx="32%" cy="28%" r="38%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.13)" />
                <stop offset="60%"  stopColor="rgba(255,255,255,0.03)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="igAtmos" cx="50%" cy="50%" r="50%">
                <stop offset="72%"  stopColor="transparent" />
                <stop offset="88%"  stopColor="rgba(45,212,191,0.07)" />
                <stop offset="100%" stopColor="rgba(45,212,191,0.18)" />
              </radialGradient>
              <clipPath id="igClip">
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
              <filter id="igPinGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Outer atmosphere rings */}
            <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke="rgba(45,212,191,0.04)" strokeWidth="35" />
            <circle cx={CX} cy={CY} r={R + 14} fill="none" stroke="rgba(45,212,191,0.08)" strokeWidth="16" />
            <circle cx={CX} cy={CY} r={R + 5}  fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="7"  />

            {/* Globe base */}
            <circle cx={CX} cy={CY} r={R} fill="url(#igSurface)" />

            {/* Grid inside clip */}
            <g clipPath="url(#igClip)">
              {latLines.map((pts, i) => (
                <polyline key={`lat${i}`} points={pts} fill="none"
                  stroke={i === 3 ? "rgba(45,212,191,0.22)" : "rgba(255,255,255,0.055)"}
                  strokeWidth={i === 3 ? 0.7 : 0.5} />
              ))}
              {lngLines.map((pts, i) => (
                <polyline key={`lng${i}`} points={pts} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.5" />
              ))}
              {/* Equator highlight */}
              {equatorPts.length > 1 && (
                <polyline points={equatorPts.join(" ")} fill="none" stroke="rgba(45,212,191,0.28)" strokeWidth="0.8" />
              )}
            </g>

            {/* Atmosphere gradient overlay */}
            <circle cx={CX} cy={CY} r={R} fill="url(#igAtmos)" />

            {/* Specular */}
            <circle cx={CX} cy={CY} r={R} fill="url(#igSpecular)" />

            {/* Globe border */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(45,212,191,0.28)" strokeWidth="1.2" />

            {/* Pins */}
            {visiblePins.map((pin, idx) => {
              const isActive = activePin?.city === pin.city;
              const c = CAT[pin.category];
              const scale = 0.55 + 0.45 * ((pin.depth + 1) / 2);
              const pr = (isActive ? 7 : 4.5) * scale;
              return (
                <g key={idx} onClick={e => { e.stopPropagation(); setActivePin(isActive ? null : pin); }} style={{ cursor: "pointer" }}>
                  {/* Pulse ring (large) */}
                  <circle cx={pin.px} cy={pin.py} r={pr * 3.5}
                    fill={isActive ? c.bg : "rgba(255,255,255,0.02)"}
                    stroke={c.dot} strokeWidth="0.5" strokeOpacity="0.3" />
                  {/* Mid ring */}
                  <circle cx={pin.px} cy={pin.py} r={pr * 2}
                    fill="none" stroke={c.dot} strokeWidth="0.8" strokeOpacity={isActive ? 0.6 : 0.25} />
                  {/* Core */}
                  <circle cx={pin.px} cy={pin.py} r={pr}
                    fill={c.dot} stroke="rgba(255,255,255,0.8)" strokeWidth={isActive ? 1.5 : 0.7}
                    filter="url(#igPinGlow)"
                    style={{ filter: `drop-shadow(0 0 ${isActive ? 10 : 6}px ${c.glow})` }} />
                  {/* Label */}
                  <text x={pin.px} y={pin.py - pr - 5}
                    textAnchor="middle"
                    fill={isActive ? c.dot : "rgba(255,255,255,0.75)"}
                    fontSize={Math.max(6, 8 * scale)}
                    fontWeight="700"
                    fontFamily="'Inter', system-ui, sans-serif"
                    style={{ pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                    {pin.city}
                  </text>
                </g>
              );
            })}

            {/* Active pin crosshair ring */}
            {activePin && pinnedActive?.visible && (
              <circle cx={pinnedActive.px} cy={pinnedActive.py}
                r={22}
                fill="none"
                stroke={CAT[activePin.category].dot}
                strokeWidth="1"
                strokeDasharray="4 3"
                strokeOpacity="0.8"
              />
            )}
          </svg>
        </div>

        {/* ── SIDE PANEL ── */}
        <div className="flex-1 w-full lg:max-w-xs xl:max-w-sm px-6 pb-8 lg:py-10 lg:pr-10">
          {activePin ? (
            /* Active pin detail */
            <div className="space-y-5" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setActivePin(null)}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
              >
                ← Tüm Projeler
              </button>
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ background: CAT[activePin.category].bg, color: CAT[activePin.category].dot, border: `1px solid ${CAT[activePin.category].dot}40` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: CAT[activePin.category].dot }} />
                  {CAT[activePin.category].label}
                </div>
                <h3 className="text-white text-2xl font-bold font-serif leading-tight">{activePin.city}</h3>
                <p className="text-slate-400 text-sm mt-0.5 font-medium">{activePin.country}</p>
              </div>
              <div className="h-px" style={{ background: `linear-gradient(90deg, ${CAT[activePin.category].dot}60, transparent)` }} />
              <p className="text-slate-300 text-sm leading-relaxed font-light">{activePin.description}</p>
              {activePin.year && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">Yıl:</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: CAT[activePin.category].bg, color: CAT[activePin.category].dot }}>
                    {activePin.year}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Pin list */
            <div className="space-y-3" onClick={e => e.stopPropagation()}>
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#2dd4bf" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#2dd4bf" }} />
                  </span>
                  <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">Proje Noktaları</span>
                </div>
                <p className="text-slate-600 text-[11px] font-light">Bir şehre tıklayarak detay görün</p>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-4">
                {Object.entries(CAT).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: val.dot, boxShadow: `0 0 5px ${val.dot}` }} />
                    <span className="text-slate-500 text-[10px] font-medium">{val.label}</span>
                  </div>
                ))}
              </div>

              {/* City list */}
              <div className="space-y-1.5 max-h-64 lg:max-h-80 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                {GLOBE_PINS.map((pin, i) => {
                  const c = CAT[pin.category];
                  const proj = project(pin.lat, pin.lng, rotY, R, CX, CY);
                  return (
                    <button
                      key={i}
                      onClick={() => setActivePin(pin)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                      style={{
                        background: activePin?.city === pin.city ? c.bg : "rgba(255,255,255,0.03)",
                        border: `1px solid ${activePin?.city === pin.city ? c.dot + "60" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: c.dot,
                          opacity: proj.visible ? 1 : 0.35,
                          boxShadow: proj.visible ? `0 0 6px ${c.glow}` : "none",
                        }}
                      />
                      <span className="flex-1">
                        <span className="text-white text-xs font-semibold">{pin.city}</span>
                        <span className="text-slate-500 text-[10px] ml-2">{pin.country}</span>
                      </span>
                      {pin.year && (
                        <span className="text-[9px] text-slate-600 font-medium">{pin.year}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
