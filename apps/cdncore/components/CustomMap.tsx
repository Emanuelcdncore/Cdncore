'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window { L: any; }
}

const bp = process.env.BASE_PATH || '';

const CustomMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLeafletMap = () => {
      try {
        if (window.L && mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = window.L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
          }).setView([40.22831908063358, -7.49888183428806], 15);

          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19,
            tileSize: 512,
            zoomOffset: -1,
            keepBuffer: 4,
            updateWhenIdle: true,
          }).addTo(mapInstanceRef.current);

          const customIcon = window.L.divIcon({
            className: 'custom-map-marker',
            html: `
              <div style="position:relative;width:64px;height:64px;pointer-events:none;">
                <div class="marker-pulse" style="position:absolute;top:32px;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:linear-gradient(to right,rgba(139,92,246,0.2),rgba(236,72,153,0.2));pointer-events:none;z-index:0;"></div>
                <img src="${bp}/assets/images/Location_Pin_Core.png" alt="CDNCORE Location" style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:30px;height:40px;z-index:1;pointer-events:none;" />
              </div>
            `,
            iconSize: [64, 64],
            iconAnchor: [32, 52],
            popupAnchor: [0, -52],
          });

          window.L.marker([40.22831908063358, -7.49888183428806], { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('CDNCORE<br>Rua G 60, 6200-823 Covilhã, Portugal');
        }
      } catch (e) {
        console.error('Error loading Leaflet map:', e);
      }
    };

    const loadLeaflet = () => {
      if (!document.querySelector('link[href*="leaflet@1.9.4"]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(css);
      }

      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => setTimeout(loadLeafletMap, 100);
        script.onerror = () => {
          if (mapRef.current) {
            mapRef.current.innerHTML = `
              <div style="width:100%;height:100%;background:#1a1a2e;display:flex;align-items:center;justify-content:center;color:#8B5CF6;font-family:Arial,sans-serif;">
                <div style="text-align:center;">
                  <div>CDNCORE</div>
                  <div style="font-size:12px;color:#ccc;">Rua G 60, 6200-823 Covilhã, Portugal</div>
                </div>
              </div>`;
          }
        };
        document.head.appendChild(script);
      } else {
        loadLeafletMap();
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden', border: 'none' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }} />

      {/* Online badge */}
      <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20 }}>
        <div style={{ width: '8px', height: '8px', backgroundColor: '#34d399', borderRadius: '9999px', animation: 'map-pulse 1.5s ease-in-out infinite' }} />
        <span style={{ color: '#34d399', fontFamily: 'monospace', fontSize: '12px' }}>ONLINE</span>
      </div>

      {/* Open in Maps button */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=40.22831908063358,-7.49888183428806&query_place_id=Parkurbis+Covilha"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 20,
          padding: '6px 12px',
          borderRadius: '6px',
          background: 'rgba(139, 92, 246, 0.25)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          backdropFilter: 'blur(8px)',
          color: '#d4d4d8',
          fontSize: '12px',
          fontFamily: 'monospace',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.45)'; e.currentTarget.style.color = '#ffffff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)'; e.currentTarget.style.color = '#d4d4d8'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Open in Maps
      </a>

      <style>{`
        @keyframes map-ping {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes map-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        .marker-pulse { animation: map-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .leaflet-container { background: #131115 !important; border: none !important; }
        .leaflet-tile-pane img { border: none !important; }
      `}</style>
    </div>
  );
};

export default CustomMap;
