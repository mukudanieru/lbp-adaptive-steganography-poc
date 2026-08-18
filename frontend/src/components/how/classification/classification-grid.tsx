type ClassificationGridProps = {
  map: number[][];
};

export function ClassificationGrid({ map }: ClassificationGridProps) {
  const flat = map.flat();
  const rough = flat.filter((v) => v === 1).length;
  const roughPct = Math.round((rough / flat.length) * 100);
  const smoothPct = 100 - roughPct;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div
        className="grid gap-0.75"
        style={{
          gridTemplateColumns: `repeat(${map[0]?.length ?? 8}, minmax(0, 1fr))`,
          aspectRatio: "1",
        }}
      >
        {flat.map((v, i) => (
          <div
            key={i}
            className={`aspect-square rounded-xs border ${
              v === 1 ? "bg-foreground border-foreground" : "border-border"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-foreground h-2.5 w-2.5 border" />
          <span className="text-muted-foreground text-xs">- 1 (rough)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="border-border h-2.5 w-2.5 border" />
          <span className="text-muted-foreground text-xs">- 0 (smooth)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border-border rounded-lg border p-2.5">
          <p className="text-muted-foreground text-xs tracking-wide">smooth</p>
          <p className="text-sm font-bold">{smoothPct}%</p>
        </div>
        <div className="bg-card border-border rounded-lg border p-2.5">
          <p className="text-muted-foreground text-xs tracking-wide">rough</p>
          <p className="text-sm font-bold">{roughPct}%</p>
        </div>
      </div>
    </div>
  );
}
