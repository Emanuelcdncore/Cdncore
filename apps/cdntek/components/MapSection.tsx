"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const MAP_CENTER = "40.228786022037426,-7.4992470004079435";
const MIN_MAP_ZOOM = 14;
const MAX_MAP_ZOOM = 19;
const DEFAULT_MAP_ZOOM = 16;

const bp = process.env.BASE_PATH || '';

export default function MapSection() {
  const [mapZoom, setMapZoom] = useState(DEFAULT_MAP_ZOOM);
  const mapIframeRef = useRef<HTMLIFrameElement | null>(null);

  const buildMapSrc = (zoom: number) =>
    `https://maps.google.com/maps?ll=${MAP_CENTER}&z=${zoom}&t=m&hl=pt&gl=pt&mapclient=embed&output=embed`;

  const handleZoomChange = (direction: "in" | "out") => {
    setMapZoom((prevZoom) => {
      const nextZoom =
        direction === "in"
          ? Math.min(MAX_MAP_ZOOM, prevZoom + 1)
          : Math.max(MIN_MAP_ZOOM, prevZoom - 1);
      if (mapIframeRef.current) {
        mapIframeRef.current.src = buildMapSrc(nextZoom);
      }
      return nextZoom;
    });
  };

  const recenterMap = () => {
    setMapZoom(() => {
      if (mapIframeRef.current) {
        mapIframeRef.current.src = buildMapSrc(DEFAULT_MAP_ZOOM);
      }
      return DEFAULT_MAP_ZOOM;
    });
  };

  return (
    <div className="w-full bg-black px-5 py-10">
      <div className="relative max-w-[1200px] mx-auto overflow-hidden">
        {/* Map embed */}
        <iframe
          ref={mapIframeRef}
          src={buildMapSrc(mapZoom)}
          className="relative z-10 w-full h-[250px] border-0 shadow-2xl block transition-all duration-500"
          style={{
            filter: "invert(1) hue-rotate(180deg) saturate(1.5) brightness(0.9) contrast(1.3)",
            borderRadius: "0px",
            transformOrigin: "center",
            pointerEvents: "none",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Zoom controls */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => handleZoomChange("in")}
            className="h-9 w-9 rounded-full bg-black/70 text-white text-lg font-semibold flex items-center justify-center border border-white/15 shadow-lg hover:bg-black/85 transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => handleZoomChange("out")}
            className="h-9 w-9 rounded-full bg-black/70 text-white text-lg font-semibold flex items-center justify-center border border-white/15 shadow-lg hover:bg-black/85 transition-colors"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>

        {/* Pin with image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none z-30">
          <div className="relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-24 h-24 rounded-full bg-cyan-500/50 blur-xl animate-pulse" />
            <div
              className="relative z-40 cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              onClick={recenterMap}
              title="Clique para recentralizar"
            >
              <Image
                src={`${bp}/Pin_tek.png`}
                alt="Location"
                width={44}
                height={44}
                unoptimized
                className="filter drop-shadow-lg select-none"
              />
            </div>
          </div>
        </div>

        {/* Status online */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-20 pointer-events-none">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-mono text-xs">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
