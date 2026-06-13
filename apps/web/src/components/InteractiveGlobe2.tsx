"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

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

const CAT: Record<GlobePin["category"], { dot: string; glow: string; label: string; bg: string; rgb: string }> = {
  otopark: { dot: "#2dd4bf", glow: "rgba(45,212,191,0.6)",  label: "Otopark",  bg: "rgba(45,212,191,0.12)",  rgb: "45,212,191"  },
  enerji:  { dot: "#fb923c", glow: "rgba(251,146,60,0.6)",  label: "Enerji",   bg: "rgba(251,146,60,0.12)",  rgb: "251,146,60"  }, // glowing orange
  egitim:  { dot: "#c084fc", glow: "rgba(192,132,252,0.6)", label: "Eğitim",   bg: "rgba(192,132,252,0.12)", rgb: "192,132,252" }, // glowing lavender/purple
};

// ── WORLD SIMULATION DATA ──
const LAND_POLYGONS: [number, number][][] = [
  // North America
  [[-168, 65], [-150, 70], [-120, 75], [-90, 75], [-60, 75], [-50, 60], [-60, 50], [-80, 25], [-90, 16], [-100, 20], [-105, 20], [-110, 8], [-85, 8], [-80, 15], [-82, 25], [-75, 35], [-70, 45], [-65, 48]],
  // South America
  [[-80, 12], [-72, 10], [-60, 5], [-50, -5], [-35, -7], [-40, -20], [-60, -40], [-70, -55], [-75, -50], [-72, -40], [-70, -30], [-80, -15], [-82, -5], [-80, 5]],
  // Africa
  [[-17, 15], [-17, 32], [-5, 36], [10, 36], [25, 32], [32, 30], [34, 27], [43, 12], [51, 11], [46, -5], [40, -15], [30, -32], [20, -34], [10, -34], [10, -15], [5, -5], [8, 5]],
  // Eurasia
  [[-10, 36], [-10, 55], [10, 65], [20, 70], [40, 75], [60, 75], [80, 75], [100, 75], [120, 75], [140, 73], [160, 70], [180, 65], [170, 55], [160, 40], [140, 35], [130, 35], [125, 20], [115, 10], [110, 1], [105, 5], [100, 15], [95, 10], [90, 22], [80, 10], [75, 6], [70, 20], [60, 12], [50, 25], [40, 15], [35, 30], [25, 36], [15, 38], [5, 35], [-5, 35]],
  // Australia
  [[113, -22], [115, -12], [130, -10], [143, -10], [148, -15], [153, -28], [145, -38], [130, -35], [115, -35]],
  // Greenland
  [[-73, 70], [-60, 83], [-20, 83], [-30, 70], [-45, 60]],
  // India
  [[68, 24], [78, 8], [88, 22]],
  // UK / Ireland
  [[-10, 50], [-8, 58], [-2, 59], [2, 55], [0, 50], [-5, 49]],
  // Japan
  [[130, 30], [133, 35], [140, 40], [144, 44], [146, 40], [138, 32]],
  // Indonesian chain
  [[95, -5], [105, -6], [115, -8], [120, -5], [130, -3], [140, -3], [150, -10], [140, -8], [130, -8], [120, -9], [110, -8], [100, -2]]
];

function isPointInPoly(pt: [number, number], poly: [number, number][]) {
  const x = pt[0], y = pt[1];
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Generate static list of points representing the globe surface dots
const GRID_DOTS: { lat: number; lng: number; isLand: boolean }[] = (() => {
  const list: { lat: number; lng: number; isLand: boolean }[] = [];
  const latStep = 3.5;
  for (let lat = -80; lat <= 80; lat += latStep) {
    const cosLat = Math.cos(lat * Math.PI / 180);
    // Scale longitude step to preserve dot density near poles
    const lngStep = 3.5 / (cosLat > 0.08 ? cosLat : 0.08);
    for (let lng = -180; lng < 180; lng += lngStep) {
      const pt: [number, number] = [lng, lat];
      let isLand = false;
      for (const poly of LAND_POLYGONS) {
        if (isPointInPoly(pt, poly)) {
          isLand = true;
          break;
        }
      }
      list.push({ lat, lng, isLand });
    }
  }
  return list;
})();

export default function InteractiveGlobe2() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Component configuration sizes
  const size = 520;
  const CX = size / 2;
  const CY = size / 2;
  const R = size / 2 - 8;

  // React-controlled filter state
  const [selectedCategory, setSelectedCategory] = useState<"tümü" | GlobePin["category"]>("tümü");
  const [activePin, setActivePin] = useState<GlobePin | null>(null);

  // Rotation states inside refs for 60fps canvas performance
  const rotYRef = useRef<number>(62); // Centered on Europe/Middle East initially
  const rotXRef = useRef<number>(18);
  const velocityYRef = useRef<number>(0);
  const velocityXRef = useRef<number>(0);

  // Interaction tracking refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number }>({ x: 0, y: 0, rotY: 0, rotX: 0 });
  const activePinRef = useRef<GlobePin | null>(null);
  const selectedCategoryRef = useRef<typeof selectedCategory>("tümü");

  // Keep active values inside refs synced with state
  useEffect(() => {
    activePinRef.current = activePin;
  }, [activePin]);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  // Handle pointer interactions on the canvas
  const handleStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      rotY: rotYRef.current,
      rotX: rotXRef.current
    };
    velocityYRef.current = 0;
    velocityXRef.current = 0;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    const targetRotY = (dragStartRef.current.rotY + dx * 0.35) % 360;
    // Clamp vertical rotation to avoid flipping upside down
    const targetRotX = Math.max(-55, Math.min(55, dragStartRef.current.rotX - dy * 0.35));

    // Save velocity for inertia physics
    velocityYRef.current = (targetRotY - rotYRef.current) * 0.6;
    velocityXRef.current = (targetRotX - rotXRef.current) * 0.6;

    rotYRef.current = targetRotY;
    rotXRef.current = targetRotX;
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  // Convert click coordinates to project detection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    // Translate click to canvas resolution coordinates
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Filter pins based on selected tab category
    const filteredPins = GLOBE_PINS.filter(
      p => selectedCategory === "tümü" || p.category === selectedCategory
    );

    let clickedPin: GlobePin | null = null;
    let minDistance = 16; // Hit test distance threshold (pixels)

    // Calculate projection of each pin to find click target
    const ry = (rotYRef.current * Math.PI) / 180;
    const rx = (rotXRef.current * Math.PI) / 180;

    for (const pin of filteredPins) {
      const latRad = (pin.lat * Math.PI) / 180;
      const lngRad = (pin.lng * Math.PI) / 180;

      const px3 = Math.cos(latRad) * Math.sin(lngRad);
      const py3 = Math.sin(latRad);
      const pz3 = Math.cos(latRad) * Math.cos(lngRad);

      // Rotate Y
      const x1 = px3 * Math.cos(ry) - pz3 * Math.sin(ry);
      const z1 = px3 * Math.sin(ry) + pz3 * Math.cos(ry);

      // Rotate X
      const y2 = py3 * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = py3 * Math.sin(rx) + z1 * Math.cos(rx);

      if (z2 > -0.15) {
        const sx = CX + x1 * R;
        const sy = CY - y2 * R;
        const dist = Math.hypot(clickX - sx, clickY - sy);
        if (dist < minDistance) {
          minDistance = dist;
          clickedPin = pin;
        }
      }
    }

    if (clickedPin) {
      setActivePin(clickedPin);
    } else {
      // Clicked on empty space, deselect active pin
      setActivePin(null);
    }
  };

  // Main canvas animation and physics loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable high DPI retina rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let lastTime = Date.now();

    const drawLoop = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // ── Physics Inertia & Rotation Updates ──
      if (!isDraggingRef.current) {
        // Apply velocity momentum
        rotYRef.current = (rotYRef.current + velocityYRef.current) % 360;
        rotXRef.current = Math.max(-55, Math.min(55, rotXRef.current + velocityXRef.current));

        // Decelerate with friction
        velocityYRef.current *= 0.95;
        velocityXRef.current *= 0.95;

        // If inertia is fully depleted, resume standard auto rotation
        if (Math.abs(velocityYRef.current) < 0.02 && Math.abs(velocityXRef.current) < 0.02) {
          velocityYRef.current = 0;
          velocityXRef.current = 0;

          // Auto-rotate horizontal
          rotYRef.current = (rotYRef.current + 0.12) % 360;

          // Slow vertical floating drift (wobble)
          const wobble = 12 + Math.sin(currentTime * 0.0008) * 4;
          rotXRef.current += (wobble - rotXRef.current) * 0.02;
        }
      }

      // ── Canvas Reset ──
      ctx.clearRect(0, 0, size, size);

      // Precalculate rotation matrices
      const ry = (rotYRef.current * Math.PI) / 180;
      const rx = (rotXRef.current * Math.PI) / 180;

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      // ── Atmosphere Halo behind sphere ──
      ctx.save();
      const haloGrad = ctx.createRadialGradient(CX, CY, R * 0.95, CX, CY, R + 24);
      haloGrad.addColorStop(0, "rgba(251, 191, 36, 0.08)"); // warm outer gold glow
      haloGrad.addColorStop(0.3, "rgba(251, 146, 60, 0.04)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(CX, CY, R + 24, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // Outer rings (orbital compass line)
      ctx.strokeStyle = "rgba(251, 191, 36, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(CX, CY, R + 8, 0, 2 * Math.PI);
      ctx.stroke();

      // ── Sphere Core Gradient (Translucent glass) ──
      ctx.save();
      const sphereGrad = ctx.createRadialGradient(CX - R * 0.3, CY - R * 0.3, 0, CX - R * 0.3, CY - R * 0.3, R * 1.5);
      sphereGrad.addColorStop(0, "rgba(251, 191, 36, 0.16)"); // gold highlight
      sphereGrad.addColorStop(0.35, "rgba(251, 191, 36, 0.03)");
      sphereGrad.addColorStop(0.7, "rgba(10, 17, 32, 0.55)"); // dark navy
      sphereGrad.addColorStop(1, "rgba(3, 5, 10, 0.92)"); // space black shadow
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, 2 * Math.PI);
      ctx.fill();

      // Ring border
      ctx.strokeStyle = "rgba(251, 191, 36, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // ── Draw Grid Dots (Translucent front and back) ──
      // Sort dots roughly by depth to draw back-side first (gives proper occlusion/layering)
      const projectedDots = GRID_DOTS.map(dot => {
        const latRad = (dot.lat * Math.PI) / 180;
        const lngRad = (dot.lng * Math.PI) / 180;

        const x3 = Math.cos(latRad) * Math.sin(lngRad);
        const y3 = Math.sin(latRad);
        const z3 = Math.cos(latRad) * Math.cos(lngRad);

        // Rotate Y
        const x1 = x3 * cosY - z3 * sinY;
        const z1 = x3 * sinY + z3 * cosY;

        // Rotate X
        const y2 = y3 * cosX - z1 * sinX;
        const z2 = y3 * sinX + z1 * cosX;

        return {
          px: CX + x1 * R,
          py: CY - y2 * R,
          depth: z2,
          isLand: dot.isLand
        };
      });

      // Draw BACK side dots (Z <= 0)
      for (const d of projectedDots) {
        if (d.depth <= 0) {
          if (d.isLand) {
            const opacity = (d.depth + 1) * 0.09; // Fade out as it wraps fully behind
            ctx.fillStyle = `rgba(217, 119, 6, ${opacity})`; // dim dark gold
            ctx.beginPath();
            ctx.arc(d.px, d.py, 0.6, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }

      // Draw FRONT side dots (Z > 0)
      for (const d of projectedDots) {
        if (d.depth > 0) {
          if (d.isLand) {
            const opacity = 0.15 + d.depth * 0.7; // Brighter towards the center/front
            ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`; // glowing gold
            ctx.beginPath();
            ctx.arc(d.px, d.py, 0.7 + d.depth * 0.7, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            // Very dim ocean grid to maintain spherical texture
            const opacity = d.depth * 0.08;
            ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`; // slate-400
            ctx.beginPath();
            ctx.arc(d.px, d.py, 0.45, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }

      // ── Draw Category-filtered Pins ──
      const activeP = activePinRef.current;
      const filterCat = selectedCategoryRef.current;

      const filteredPins = GLOBE_PINS.filter(
        p => filterCat === "tümü" || p.category === filterCat
      );

      // Project pins and separate into front / back
      const projectedPins = filteredPins.map(pin => {
        const latRad = (pin.lat * Math.PI) / 180;
        const lngRad = (pin.lng * Math.PI) / 180;

        const px3 = Math.cos(latRad) * Math.sin(lngRad);
        const py3 = Math.sin(latRad);
        const pz3 = Math.cos(latRad) * Math.cos(lngRad);

        // Rotate Y
        const x1 = px3 * cosY - pz3 * sinY;
        const z1 = px3 * sinY + pz3 * cosY;

        // Rotate X
        const y2 = py3 * cosX - z1 * sinX;
        const z2 = py3 * sinX + z1 * cosX;

        return {
          pin,
          px: CX + x1 * R,
          py: CY - y2 * R,
          depth: z2,
          visible: z2 > -0.15
        };
      });

      // Render pins in depth order
      projectedPins.sort((a, b) => a.depth - b.depth);

      for (const p of projectedPins) {
        if (!p.visible) continue;

        const isActive = activeP?.city === p.pin.city;
        const scale = 0.6 + 0.4 * ((p.depth + 1) / 2); // perspective scaling
        const c = CAT[p.pin.category];

        // Draw futuristic holographic beacon/pin
        ctx.save();

        // 1. Draw vertical radar projection line
        ctx.strokeStyle = c.dot;
        ctx.lineWidth = isActive ? 1.5 : 0.8;
        ctx.globalAlpha = isActive ? 0.9 : 0.4 * scale;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.px, p.py - 14 * scale);
        ctx.stroke();

        // 2. Glowing pulse rings
        const t = currentTime / 1000;
        const pulseRatio = (t * 0.8) % 1;
        ctx.strokeStyle = c.dot;
        ctx.globalAlpha = isActive ? 0.9 * (1 - pulseRatio) : 0.5 * (1 - pulseRatio) * scale;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.px, p.py, (isActive ? 18 : 10) * pulseRatio, 0, 2 * Math.PI);
        ctx.stroke();

        // 3. Pin tip beacon dot
        ctx.shadowColor = c.dot;
        ctx.shadowBlur = isActive ? 18 : 6;
        ctx.fillStyle = c.dot;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.px, p.py - 14 * scale, isActive ? 5.5 : 3.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow

        // White core dot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.px, p.py - 14 * scale, isActive ? 2 : 1.2, 0, 2 * Math.PI);
        ctx.fill();

        // 4. Pin base ring on globe surface
        ctx.strokeStyle = c.dot;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = isActive ? 0.85 : 0.35 * scale;
        ctx.beginPath();
        ctx.arc(p.px, p.py, isActive ? 5 : 3, 0, 2 * Math.PI);
        ctx.stroke();

        // 5. Text Label
        ctx.font = `bold ${isActive ? 11 : 9.5}px 'Inter', system-ui, sans-serif`;
        ctx.fillStyle = isActive ? "#ffffff" : "rgba(255, 255, 255, 0.78)";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        // Dark drop shadow behind text for readability
        ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
        ctx.shadowBlur = 4;
        ctx.fillText(p.pin.city, p.px, p.py - (18 * scale));
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filtered pins for listing on the side
  const filteredPinsForList = useMemo(() => {
    return GLOBE_PINS.filter(
      p => selectedCategory === "tümü" || p.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-3xl overflow-hidden border border-slate-800"
      style={{
        background: "linear-gradient(135deg, #070b13 0%, #0c1220 50%, #080d18 100%)",
        boxShadow: "0 0 60px rgba(251,191,36,0.04), 0 30px 80px rgba(0,0,0,0.85)",
      }}
      onClick={() => setActivePin(null)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-0">
        
        {/* ── GLOBE COLUMN ── */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center p-8 lg:p-10 select-none"
          style={{ width: "100%", maxWidth: 600 }}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleEnd}
        >
          {/* Subtle grid coordinate background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-[0.03] flex items-center justify-center">
            <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          {/* Sürükle / Döndür Tip */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-amber-500/50 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/10">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3"/></svg>
              Serbest 3D Döndürme
            </span>
          </div>

          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              width: size,
              height: size,
              cursor: isDraggingRef.current ? "grabbing" : "grab",
              maxWidth: "100%",
              height: "auto",
              filter: "drop-shadow(0 0 35px rgba(251,191,36,0.06))",
            }}
          />
        </div>

        {/* ── SIDE INFORMATION COLUMN ── */}
        <div className="flex-1 w-full lg:max-w-xs xl:max-w-sm px-6 pb-8 lg:py-10 lg:pr-10">
          {activePin ? (
            /* Selected Pin Details View */
            <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActivePin(null)}
                className="flex items-center gap-1.5 text-amber-500/70 hover:text-amber-400 text-xs font-semibold tracking-wide transition-colors group"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span> Tüm Projeler
              </button>

              <div className="space-y-2">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: CAT[activePin.category].bg,
                    color: CAT[activePin.category].dot,
                    border: `1px solid ${CAT[activePin.category].dot}40`
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CAT[activePin.category].dot }} />
                  {CAT[activePin.category].label}
                </div>
                <h3 className="text-white text-2xl font-bold font-serif leading-tight">{activePin.city}</h3>
                <p className="text-slate-400 text-sm font-medium">{activePin.country}</p>
              </div>

              <div className="h-px bg-[linear-gradient(90deg,rgba(251,191,36,0.3),transparent)]" />
              
              <p className="text-slate-300 text-sm leading-relaxed font-light">{activePin.description}</p>
              
              {activePin.year && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-slate-500 text-xs font-medium">Faaliyet Yılı:</span>
                  <span
                    className="text-xs font-bold px-3 py-0.5 rounded-full border"
                    style={{
                      background: CAT[activePin.category].bg,
                      color: CAT[activePin.category].dot,
                      borderColor: `${CAT[activePin.category].dot}30`
                    }}
                  >
                    {activePin.year}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Main List & Category Filter Tabs View */
            <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#fb923c" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#fb923c" }} />
                  </span>
                  <span className="text-amber-500/80 text-xs font-bold tracking-widest uppercase">PROJE NOKTALARI</span>
                </div>
                <p className="text-slate-500 text-[11px] font-light">Kategori seçin veya haritadan bir şehre dokunun</p>
              </div>

              {/* Custom Category Tabs */}
              <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-900 gap-1 text-[11px]">
                {(["tümü", "otopark", "enerji", "egitim"] as const).map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActivePin(null);
                      }}
                      className="flex-1 py-1.5 rounded-md font-semibold capitalize transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(251, 191, 36, 0.12)" : "transparent",
                        color: isActive ? "#fbbf24" : "#64748b",
                        border: isActive ? "1px solid rgba(251, 191, 36, 0.2)" : "1px solid transparent"
                      }}
                    >
                      {cat === "tümü" ? "Tümü" : cat === "egitim" ? "Eğitim" : cat}
                    </button>
                  );
                })}
              </div>

              {/* City Button List */}
              <div className="space-y-1.5 max-h-60 lg:max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800">
                {filteredPinsForList.map((pin, i) => {
                  const c = CAT[pin.category];
                  return (
                    <button
                      key={i}
                      onClick={() => setActivePin(pin)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:bg-slate-900/50"
                      style={{
                        background: "rgba(255,255,255,0.015)",
                        border: "1px solid rgba(255,255,255,0.03)",
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                        style={{
                          background: c.dot,
                          boxShadow: `0 0 6px ${c.dot}`,
                        }}
                      />
                      <span className="flex-1">
                        <span className="text-white text-xs font-semibold block leading-tight">{pin.city}</span>
                        <span className="text-slate-500 text-[10px]">{pin.country}</span>
                      </span>
                      {pin.year && (
                        <span className="text-[9px] text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-950 border border-slate-900">{pin.year}</span>
                      )}
                    </button>
                  );
                })}

                {filteredPinsForList.length === 0 && (
                  <p className="text-center text-slate-600 text-xs italic py-4">Bu kategoride faaliyet bulunmamaktadır.</p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
