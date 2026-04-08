interface BirdIconProps {
  size?: number;
  className?: string;
}

export default function BirdIcon({ size = 60, className }: BirdIconProps) {
  const h = Math.round(size * (751 / 1095));

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${process.env.BASE_PATH || ""}/logo-bird.png`}
      alt="Loritalk bird logo"
      width={size}
      height={h}
      className={className}
      style={{ width: size, height: h }}
    />
  );
}
