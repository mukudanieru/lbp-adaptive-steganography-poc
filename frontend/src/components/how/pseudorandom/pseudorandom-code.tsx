export default function PseudorandomCode() {
  return (
    <div className="w-full min-w-0">
      <div className="border-border overflow-hidden rounded-lg border bg-stone-900">
        <div className="border-border text-muted-foreground border-b px-3 py-2 text-xs">
          pseudorandom.py
        </div>
        <pre className="overflow-x-auto px-3 py-3 text-[11px] leading-relaxed">
          <code>
            {/* Seed */}
            <span className="text-sky-400">seed</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-amber-300">6095851929708602638</span>{" "}
            <span className="text-emerald-400/80">
              # From the input password
            </span>
            {"\n"}
            {/* Dimensions */}
            <span className="text-sky-400">image_height</span>
            <span className="text-muted-foreground">,</span>{" "}
            <span className="text-sky-400">image_width</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-amber-300">8</span>
            <span className="text-muted-foreground">,</span>{" "}
            <span className="text-amber-300">8</span>{" "}
            <span className="text-emerald-400/80"># For an 8 x 8 px image</span>
            {"\n\n"}
            {/* Linear Coordinates */}
            <span className="text-sky-400">linear_coordinates</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-muted-foreground">[</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-foreground">x</span>
            <span className="text-muted-foreground">,</span>{" "}
            <span className="text-foreground">y</span>
            <span className="text-muted-foreground">)</span>{" "}
            <span className="text-pink-400">for</span>{" "}
            <span className="text-foreground">x</span>{" "}
            <span className="text-pink-400">in</span>{" "}
            <span className="text-foreground">range</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-sky-400">image_height</span>
            <span className="text-muted-foreground">)</span>{" "}
            <span className="text-pink-400">for</span>{" "}
            <span className="text-foreground">y</span>{" "}
            <span className="text-pink-400">in</span>{" "}
            <span className="text-foreground">range</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-sky-400">image_width</span>
            <span className="text-muted-foreground">)]</span>
            {"\n"}
            {/* Structure Comment 1 */}
            <span className="text-emerald-400/80">
              {"# Example structure:\n"}
              {"# [\n"}
              {
                "#   (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7),\n"
              }
              {
                "#   (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),\n"
              }
              {"#   ... (continues sequentially through row 7)\n"}
              {
                "#   (7, 0), (7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7)\n"
              }
              {"# ]\n"}
            </span>
            {"\n"}
            {/* Shuffled Coordinates */}
            <span className="text-sky-400">random_coordinates</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-foreground">PRNG</span>
            <span className="text-muted-foreground">.</span>
            <span className="text-sky-400">MersenneTwister</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-sky-400">seed</span>
            <span className="text-muted-foreground">,</span>{" "}
            <span className="text-sky-400">linear_coordinates</span>
            <span className="text-muted-foreground">)</span>
            {"\n"}
            {/* Structure Comment 2 */}
            <span className="text-emerald-400/80">
              {"# Example structure:\n"}
              {"# [\n"}
              {
                "#   (3, 5), (0, 2), (7, 1), (4, 6), (1, 0), (6, 7), (2, 3), (5, 4),\n"
              }
              {
                "#   (0, 7), (7, 4), (3, 1), (1, 5), (6, 2), (4, 0), (2, 6), (5, 3),\n"
              }
              {"#   ... (all 64 coordinate pairs pseudo-randomly shuffled)\n"}
              {"# ]"}
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}
