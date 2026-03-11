"use client";

import { useEffect, useRef, useState } from "react";

const LOOP_END_SECONDS = 14;
const FADE_DURATION_SECONDS = 0.7;

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

const bp = process.env.BASE_PATH || '';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = isMobileDevice();
    const delay = isMobile ? 1000 : 100;

    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, delay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true);
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [shouldLoadVideo]);

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;
    if (video.duration > LOOP_END_SECONDS) {
      video.currentTime = 0;
    }
    setIsVideoReady(true);
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const fadeStart = LOOP_END_SECONDS - FADE_DURATION_SECONDS;

    if (video.currentTime >= fadeStart && video.currentTime < LOOP_END_SECONDS) {
      video.style.transition = `opacity ${FADE_DURATION_SECONDS}s ease`;
      video.style.opacity = "0";
    } else if (video.style.opacity !== "1") {
      video.style.opacity = "1";
    }

    if (video.currentTime >= LOOP_END_SECONDS) {
      video.currentTime = 0;
      video.play();
      video.style.opacity = "1";
    }
  };

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative" ref={containerRef}>
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[600px] lg:h-[700px] bg-black overflow-hidden">
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={`${bp}/tek.mp4`}
              autoPlay
              muted
              playsInline
              controls={false}
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onCanPlay={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(() => {});
                }
              }}
              style={{
                opacity: isVideoReady ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
