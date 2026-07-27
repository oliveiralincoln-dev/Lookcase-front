interface LookCaseMarkProps {
  size?: number;
  className?: string;
}

export function LookcaseMark({ size = 40, className }: LookCaseMarkProps) {
  const height = size;
  const width = Math.round(size * (100 / 112));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lookcase"
      className={className}
    >
      {/* Bloco laranja */}
      <rect width="100" height="112" rx="9" fill="#F97316" />
      {/* L — vertical */}
      <rect x="24" y="20" width="11" height="72" fill="#000" />
      {/* L — horizontal */}
      <rect x="24" y="81" width="26" height="11" fill="#000" />
      {/* C — top arm */}
      <rect x="46" y="20" width="30" height="11" fill="#000" />
      {/* C — spine */}
      <rect x="65" y="20" width="11" height="72" fill="#000" />
      {/* C — bottom arm */}
      <rect x="46" y="81" width="30" height="11" fill="#000" />
    </svg>
  );
}
