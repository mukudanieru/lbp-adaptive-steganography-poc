import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Button } from "../../ui/button";

type PseudorandomGridProps = {
  map: number[][];
  isPseudorandom?: boolean;
};

export default function PseudorandomGrid({
  map,
  isPseudorandom = true,
}: PseudorandomGridProps) {
  const flat = map.flat();
  const size = map[0]?.length ?? 8;
  const total = flat.length;

  const order = useMemo(() => {
    if (!isPseudorandom) return Array.from({ length: total }, (_, i) => i);
    return Array.from({ length: total }, (_, i) => (i * 17) % total);
  }, [isPseudorandom, total]);

  const [step, setStep] = useState(0);
  const visited = useMemo(() => new Set(order.slice(0, step)), [order, step]);

  const handleNext = () => setStep((s) => Math.min(total, s + 1));
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));
  const handleReset = () => setStep(0);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div
        className="grid gap-0.75"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          aspectRatio: "1",
        }}
      >
        {flat.map((v, i) => {
          const isVisited = visited.has(i);

          return (
            <div
              key={i}
              className={`aspect-square rounded-xs border ${
                isVisited
                  ? "border-amber-500 bg-amber-500 dark:border-yellow-300 dark:bg-yellow-300"
                  : v === 1
                    ? "bg-foreground border-foreground"
                    : "border-border"
              }`}
            />
          );
        })}
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground text-xs">
          {isPseudorandom ? "Pseudorandom Order" : "Sequential Order"}
        </span>

        {/* STEPS */}
        <span className="text-muted-foreground text-xs">
          {step}/{total}
        </span>
      </div>

      <div className="flex justify-between">
        <Button
          className="hover:cursor-pointer"
          size="lg"
          variant="outline"
          onClick={handleReset}
        >
          Reset
        </Button>

        <div className="flex gap-2">
          <Button
            className="hover:cursor-pointer"
            size="icon-lg"
            variant="outline"
            onClick={handlePrev}
            disabled={step <= 0}
          >
            <CaretLeftIcon />
          </Button>
          <Button
            className="hover:cursor-pointer"
            size="icon-lg"
            variant="outline"
            onClick={handleNext}
            disabled={step >= total}
          >
            <CaretRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
