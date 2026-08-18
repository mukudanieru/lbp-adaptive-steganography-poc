import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Button } from "../../ui/button";

type LSBProcessProps = {
  map: number[][];
  message: string;
  isExtraction?: boolean;
};

function bitsToText(bits: string) {
  let out = "";
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    out += String.fromCharCode(parseInt(bits.slice(i, i + 8), 2));
  }
  return out;
}

export default function LSBProcess({
  map,
  message,
  isExtraction = false,
}: LSBProcessProps) {
  const cols = map[0]?.length ?? 8;
  const flat = useMemo(() => map.flat(), [map]);
  const total = flat.length;

  const order = useMemo(
    () => Array.from({ length: total }, (_, i) => (i * 17) % total),
    [total],
  );

  const bitsPerCell = useMemo(
    () => order.map((idx) => (flat[idx] === 1 ? 2 : 1)),
    [order, flat],
  );

  const cumulative = useMemo(() => {
    const arr = [0];
    bitsPerCell.forEach((b) => arr.push(arr[arr.length - 1] + b));
    return arr;
  }, [bitsPerCell]);

  const cellStepIndex = useMemo(() => {
    const m = new Map<number, number>();
    order.forEach((idx, i) => m.set(idx, i + 1));
    return m;
  }, [order]);

  const capacity = cumulative[cumulative.length - 1];
  const needed = Math.min(message.length, capacity);
  const truncated = message.length > capacity;

  const totalSteps = useMemo(() => {
    const idx = cumulative.findIndex((c) => c >= needed);
    return idx === -1 ? cumulative.length - 1 : idx;
  }, [cumulative, needed]);

  const [step, setStep] = useState(0);

  const bitsAtStep = (s: number) => {
    const end = Math.min(cumulative[s], needed);
    const start = Math.min(cumulative[s - 1], needed);
    return end - start;
  };

  const cursor = Math.min(cumulative[step], needed);
  const prevCursor = Math.min(cumulative[Math.max(0, step - 1)], needed);
  const visited = useMemo(() => new Set(order.slice(0, step)), [order, step]);
  const lastCell = step > 0 ? order[step - 1] : null;

  const handleNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));
  const handleReset = () => setStep(0);

  const fullBits = message.slice(0, needed);
  const displayBits = isExtraction ? fullBits.slice(0, cursor) : fullBits;
  const decodedSoFar = useMemo(
    () => bitsToText(fullBits.slice(0, cursor)),
    [fullBits, cursor],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
        <div
          className="grid w-full gap-0.75"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            aspectRatio: "1",
          }}
        >
          {flat.map((v, i) => {
            const isVisited = visited.has(i);
            const isCurrent = i === lastCell;
            const stepIdx = cellStepIndex.get(i);
            const bits = isVisited && stepIdx ? bitsAtStep(stepIdx) : null;

            return (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-xs border text-[10px] font-bold ${
                  v === 1 ? "bg-foreground border-foreground" : "border-border"
                } ${
                  isCurrent
                    ? "ring-2 ring-amber-500 ring-inset dark:ring-yellow-400"
                    : ""
                }`}
              >
                {isVisited && (
                  <span
                    className={
                      v === 1
                        ? "text-background"
                        : "text-amber-600 dark:text-yellow-400"
                    }
                  >
                    {bits}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground text-xs">
            {isExtraction ? "Extracting" : "Embedding"}
          </span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {step}/{totalSteps}
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
              disabled={step >= totalSteps}
            >
              <CaretRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium tracking-wide">
            Message Stream
          </span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {cursor}/{needed} bits
          </span>
        </div>

        <div className="border-border text-foreground bg-card rounded-lg border p-3 font-mono text-xs leading-relaxed wrap-break-word">
          {displayBits.length === 0 ? (
            <span className="text-muted-foreground">
              Waiting for the first pixel ...
            </span>
          ) : (
            displayBits.split("").map((bit, i) => (
              <span key={i}>
                {i === prevCursor && cursor > prevCursor && (
                  <span className="text-amber-600 dark:text-yellow-400">[</span>
                )}
                <span
                  className={
                    i >= prevCursor && i < cursor
                      ? "font-semibold text-amber-600 dark:text-yellow-400"
                      : i < prevCursor
                        ? "text-muted-foreground"
                        : "text-foreground"
                  }
                >
                  {bit}
                </span>
                {i === cursor - 1 && cursor > prevCursor && (
                  <span className="text-amber-600 dark:text-yellow-400">]</span>
                )}
                {(i + 1) % 8 === 0 && i !== displayBits.length - 1 && " "}
              </span>
            ))
          )}
          {truncated && (!isExtraction || cursor === needed) && (
            <span className="text-muted-foreground"> ...</span>
          )}
        </div>

        {isExtraction && (
          <div className="border-border/60 rounded-lg border border-dashed p-3">
            {!decodedSoFar ? (
              ""
            ) : (
              <p className="text-muted-foreground text-xs font-medium tracking-wide">
                Decoded:
              </p>
            )}
            <p className="text-foreground mt-1 font-mono text-xs leading-relaxed wrap-break-word">
              {decodedSoFar || (
                <span className="text-muted-foreground">
                  Nothing decoded yet
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
