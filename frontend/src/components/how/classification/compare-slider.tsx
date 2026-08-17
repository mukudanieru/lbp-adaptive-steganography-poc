import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { useCallback, useRef, useState } from "react";

type CompareSliderProps = {
  beforeSrc: string;
  beforeLabel: string;
  afterSrc: string;
  afterLabel: string;
  initialPercentage?: number;
};

export default function CompareSlider({
  beforeSrc,
  beforeLabel,
  afterSrc,
  afterLabel,
  initialPercentage = 50,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPercentage(Math.min(100, Math.max(0, ratio * 100)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    containerRef.current?.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPercentage((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPercentage((p) => Math.min(100, p + 2));
  };

  const label = percentage >= 50 ? beforeLabel : afterLabel;

  return (
    <div className="bg-card border-border flex flex-col overflow-hidden border px-1.5 pt-1.5 pb-1">
      <div
        ref={containerRef}
        className="relative aspect-square w-full touch-none overflow-hidden select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={beforeSrc}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/70"
          style={{ left: `${percentage}%` }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percentage)}
          onKeyDown={handleKeyDown}
          style={{ left: `${percentage}%` }}
          className="border-border bg-background text-foreground absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border shadow-sm"
        >
          <ArrowsLeftRightIcon size={14} />
        </div>
      </div>

      <span className="pt-2 text-xs font-light">{label}</span>
    </div>
  );
}
