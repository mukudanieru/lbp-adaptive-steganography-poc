import LSBProcess from "../least-significant-bit/lsb-process";
import {
  sampleClassificationMap,
  sampleBinaryMessageStream,
} from "../sample-data";

export default function StepFourLsb() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">04</h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold tracking-tight sm:text-lg">
          LEAST SIGNIFICANT BIT
        </h3>

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* INFORMATION */}
            <p className="text-muted-foreground min-w-0 flex-1 text-sm leading-relaxed sm:text-base">
              This is where the previous two steps come together. The Local
              Binary Pattern already decided how much each pixel can safely
              hide. The Pseudorandom Pixel Selection already decided where those
              bits go. The secret message is then embedded into the least
              significant bits of the red and blue channels, following the
              classification and traversal sequence until the message has been
              fully embedded.
            </p>

            {/* VISUALS */}
            <div className="w-full shrink-0 md:w-67">
              <LSBProcess
                map={sampleClassificationMap}
                message={sampleBinaryMessageStream}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* VISUALS */}
            <div className="w-full shrink-0 md:w-67">
              <LSBProcess
                map={sampleClassificationMap}
                message={sampleBinaryMessageStream}
                isExtraction
              />
            </div>

            {/* INFORMATION */}
            <p className="text-muted-foreground min-w-0 flex-1 text-sm leading-relaxed sm:text-base">
              Extraction follows the same process in reverse. Using the same
              password, the algorithm reproduces the pseudorandom pixel order
              and classification map, then reads 1 or 2 bits from each pixel
              according to its texture classification. The recovered bit stream
              is then reconstructed into the original message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
