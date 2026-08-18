import PseudorandomGrid from "../pseudorandom/pseudorandom-grid";
import PseudorandomCode from "../pseudorandom/pseudorandom-code";
import { sampleClassificationMap } from "../sample-data";

export default function StepThreePseudorandom() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">03</h2>

      <div className="flex flex-col gap-7 md:flex-row">
        {/* INFORMATION */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h3 className="text-base font-bold tracking-tight sm:text-lg">
            PSEUDORANDOM PIXEL SELECTION
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            Traditional LSB steganography typically embeds secret data by
            traversing pixels in a predictable, sequential order.
          </p>
        </div>

        {/* VISUALS */}
        <div className="w-full shrink-0 md:w-67">
          <PseudorandomGrid
            isPseudorandom={false}
            map={sampleClassificationMap}
          />
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* VISUALS */}
        <PseudorandomCode />

        {/* INFORMATION */}
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          After hashing the password with SHA-256, the first 8 bytes are
          converted into a 64-bit integer used to initialize the Mersenne
          Twister pseudorandom generator. The resulting sequence determines the
          order in which pixel coordinates are visited during embedding and can
          be reproduced during extraction with the same password.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-7 md:flex-row">
        {/* VISUALS */}
        <div className="w-full shrink-0 md:w-67">
          <PseudorandomGrid isPseudorandom map={sampleClassificationMap} />
        </div>

        {/* INFORMATION */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            With pseudorandom selection, the embedding locations no longer
            follow an obvious sequential pattern. This reduces the likelihood of
            statistical detection by scattering modifications across the image
            rather than following a predictable linear path.
          </p>
        </div>
      </div>
    </div>
  );
}
