import BirdIcon from "./BirdIcon";

interface LoriLogoProps {
  variant?: "horizontal" | "stacked";
  size?: number;
  className?: string;
}

/**
 * Loritalk logo in horizontal (nav) or stacked (hero) layout.
 * Wordmark uses bold lowercase — matching the official logotype style.
 */
export default function LoriLogo({ variant = "horizontal", size = 40, className }: LoriLogoProps) {
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center ${className ?? ""}`}>
        <span
          style={{
            fontWeight: 700,
            fontSize: size * 1.1,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          lori
        </span>
        <BirdIcon size={size * 1.8} />
        <span
          style={{
            fontWeight: 700,
            fontSize: size * 1.1,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          _talk
        </span>
      </div>
    );
  }

  // Horizontal variant (default — for navbar)
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <BirdIcon size={size} />
      <span
        style={{
          fontWeight: 700,
          fontSize: size * 0.75,
          lineHeight: 1,
          letterSpacing: 0,
        }}
      >
        lori_talk
      </span>
    </div>
  );
}
