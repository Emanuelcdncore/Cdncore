'use client'

import React from 'react';

interface AuroraProps {
  speed?: number;
  blend?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
}

export const Aurora: React.FC<AuroraProps> = ({
  speed = 0.2,
  blend = 0.55,
  color1 = '#4A90E2', // Azul
  color2 = '#87CEEB', // Azul claro
  color3 = '#FFFFFF', // Branco
  className = ''
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Feixe de luz principal - do topo para baixo */}
      <div 
        className="absolute top-0 left-1/2 w-[800px] h-[120%] opacity-60"
        style={{
          background: `
            linear-gradient(180deg, 
              ${color3}40 0%, 
              ${color2}60 15%, 
              ${color1}40 35%, 
              ${color2}30 60%, 
              transparent 85%
            )
          `,
          filter: 'blur(80px)',
          transform: 'translateX(-50%)',
          animation: `pulse ${8 / speed}s ease-in-out infinite alternate`,
        }}
      />
      
      {/* Luz secundária mais ampla */}
      <div 
        className="absolute top-0 left-1/2 w-[1200px] h-[130%] opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 1200px 140% at 50% 0%, 
              ${color3}20 0%, 
              ${color2}30 20%, 
              ${color1}20 45%, 
              ${color2}15 70%, 
              transparent 100%
            )
          `,
          filter: 'blur(120px)',
          transform: 'translateX(-50%)',
          animation: `pulse ${12 / speed}s ease-in-out infinite alternate-reverse`,
        }}
      />
      
      {/* Dispersão lateral esquerda */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[110%] opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 600px 100% at 100% 0%, 
              ${color2}30 0%, 
              ${color1}20 35%, 
              transparent 80%
            )
          `,
          filter: 'blur(100px)',
          animation: `pulse ${10 / speed}s ease-in-out infinite`,
        }}
      />
      
      {/* Dispersão lateral direita */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[110%] opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 600px 100% at 0% 0%, 
              ${color2}30 0%, 
              ${color1}20 35%, 
              transparent 80%
            )
          `,
          filter: 'blur(100px)',
          animation: `pulse ${10 / speed}s ease-in-out infinite alternate`,
        }}
      />
      
      {/* Brilho central intenso - mais longo */}
      <div 
        className="absolute top-0 left-1/2 w-48 h-[500px] opacity-80"
        style={{
          background: `
            linear-gradient(180deg, 
              ${color3}80 0%, 
              ${color2}60 30%, 
              ${color1}40 60%, 
              transparent 100%
            )
          `,
          filter: 'blur(30px)',
          transform: 'translateX(-50%)',
          animation: `glow ${6 / speed}s ease-in-out infinite`,
        }}
      />
      
      <style jsx global>{`
        @keyframes glow {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.1); }
        }
      `}</style>
    </div>
  );
};