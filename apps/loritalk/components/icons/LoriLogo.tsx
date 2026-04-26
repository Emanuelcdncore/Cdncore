interface LoriLogoProps {
  variant?: "horizontal" | "stacked";
  size?: number;
  className?: string;
}

const ASPECT = 385.1 / 179.98;

export default function LoriLogo({ variant = "horizontal", size = 40, className }: LoriLogoProps) {
  const height = variant === "stacked" ? size * 3.2 : size;
  const width = Math.round(height * ASPECT);
  const src = `${process.env.BASE_PATH || ""}/logo-loritalk.svg`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Loritalk"
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
    />
  );
}
