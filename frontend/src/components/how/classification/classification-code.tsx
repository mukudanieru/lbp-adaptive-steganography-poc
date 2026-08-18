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
      <div className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900">
        <div className="border-b border-stone-800 px-3 py-2 text-xs text-stone-400">
          {filename}
        </div>
        <pre className="overflow-x-auto px-3 py-3 text-[11px] leading-relaxed">
          <code>
            <span className="text-sky-400">classification_map</span>{" "}
            <span className="text-stone-500">=</span>{" "}
            <span className="text-stone-500">[</span>
            {"\n"}
            {map.map((row, i) => (
              <span key={i}>
                {"  "}
                <span className="text-stone-500">[</span>
                {row.map((v, j) => (
                  <span key={j}>
                    <span className="text-amber-300">{v}</span>
                    {j < row.length - 1 && (
                      <span className="text-stone-500">, </span>
                    )}
                  </span>
                ))}
                <span className="text-stone-500">]</span>
                {i < map.length - 1 && (
                  <span className="text-stone-500">,</span>
                )}
                {"\n"}
              </span>
            ))}
            <span className="text-stone-500">]</span>
          </code>
        </pre>
      </div>
    </div>
  );
}
