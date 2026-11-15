import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-surface-container-high via-surface-container to-surface-dim flex flex-col items-center justify-center p-4 text-center text-on-surface-variant"
        role="img"
        aria-label={alt}
      >
        <span className="material-symbols-outlined text-[36px] text-primary mb-1">
          precision_manufacturing
        </span>
        <span className="font-display text-xs font-bold uppercase tracking-wide text-on-surface line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
