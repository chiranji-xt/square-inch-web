import { useState, useEffect } from "react";

// Image-first component. Renders /photos/* assets with lazy loading.
// If a file is ever missing, it degrades to a quiet neutral block —
// no developer messaging ever reaches visitors.
export default function Photo({ src, label = "Square Inch Design", alt, palette = ["#222", "#E88932"], className = "", imgClass = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  // A new src means a new image: never let one failure poison the next.
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (!failed) {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <img
          src={src}
          alt={alt ?? label}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover img-cine ${imgClass}`}
        />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden flex items-end p-6 ${className}`}
      style={{ background: `linear-gradient(135deg, ${palette[0]} 0%, #111 55%, ${palette[1]} 160%)` }}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-20" style={{ background: "repeating-linear-gradient(90deg, transparent 0 46px, rgba(255,255,255,.12) 46px 47px)" }} />
      <div>
        <p className="display text-bone text-2xl md:text-4xl leading-none">{label}</p>
      </div>
    </div>
  );
}
