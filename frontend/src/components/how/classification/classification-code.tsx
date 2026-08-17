// components/classification-code.tsx
type ClassificationCodeProps = {
  map: number[][];
  filename?: string;
};

export function ClassificationCode({
  map,
  filename = "lbp.py",
}: ClassificationCodeProps) {
  return (
    <div className="w-full min-w-0 md:w-80">
      <div className="border-border overflow-hidden rounded-lg border bg-stone-900">
        <div className="border-border text-muted-foreground border-b px-3 py-2 text-xs">
          {filename}
        </div>
        <pre className="overflow-x-auto px-3 py-3 text-[11px] leading-relaxed">
          <code>
            <span className="text-sky-400">classification_map</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-muted-foreground">[</span>
            {"\n"}
            {map.map((row, i) => (
              <span key={i}>
                {"  "}
                <span className="text-muted-foreground">[</span>
                {row.map((v, j) => (
                  <span key={j}>
                    <span className="text-amber-300">{v}</span>
                    {j < row.length - 1 && (
                      <span className="text-muted-foreground">, </span>
                    )}
                  </span>
                ))}
                <span className="text-muted-foreground">]</span>
                {i < map.length - 1 && (
                  <span className="text-muted-foreground">,</span>
                )}
                {"\n"}
              </span>
            ))}
            <span className="text-muted-foreground">]</span>
          </code>
        </pre>
      </div>
    </div>
  );
}
