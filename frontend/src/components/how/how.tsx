import { Field, FieldLabel } from "../ui/field";
import PasswordInput from "../password-input";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompareSlider from "./classification/compare-slider";
import ImageCard from "./image-card";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { ClassificationGrid } from "./classification/classification-grid";
import { ClassificationCode } from "./classification/classification-code";
import PseudorandomGrid from "./pseudorandom/pseudorandom-grid";
import PseudorandomCode from "./pseudorandom/pseudorandom-code";
import LSBProcess from "./least-significant-bit/lsb-process.tsx";

// STEP 01 DATA
const preprocessing = [
  {
    value: "password",
    trigger: "Input Password",
    steps: [
      { label: "Raw Input", value: "love you 10_000 years" },
      {
        label: "SHA-256 Hash",
        value:
          "5498d10869a9250e2f84342dc5125900a8d5f6336ae48b5f567e2d09554f33ce",
      },
      {
        label: "First 8 Bytes → Seed",
        value: "5498d10869a9250e → 6095851929708602638",
      },
    ],
  },
  {
    value: "message",
    trigger: "Input Secret Message",
    steps: [
      {
        label: "Raw Input",
        value: "Somehow everything comes with an expiry date.",
      },
      { label: "Each character → ASCII code", value: "S(83) o(111) m(109) …" },
      {
        label: "Concatenated Bit Stream",
        value: "01010011 01101111 01101101 …",
      },
    ],
  },
];

// STEP 02 DATA
// STEP 03 and 04 DATA
const sampleClassificationMap = [
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

// STEP 04 DATA
const sampleBinaryMessageStream =
  "010100110110111101101101011001010110100001101111011101110010000001100101011101100110010101110010011110010111010001101000011010010110111001100111001000000110001101101111011011010110010101110000001000000111011101101001011101000110100000100000011000010110111000100000011001010111100001110000011010010111001001111001001000000110010001100001011101000110010100101110";

// STEP 05 DATA

export default function How() {
  return (
    <section className="border-border/60 flex w-full max-w-2xl flex-col gap-12 border-t px-2 py-16 sm:py-24">
      <p className="text-xs font-semibold tracking-wide text-sky-300">HOW</p>

      <div className="flex flex-col gap-32">
        {/* STEP 1 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">01</h2>

          {/* VISUALS */}
          <div className="flex flex-col gap-7 md:flex-row">
            <div className="w-full shrink-0 space-y-4 md:w-67">
              <ImageCard imgSrc="/cover.png" />

              <Field>
                <FieldLabel htmlFor="password-sample">Password</FieldLabel>
                <PasswordInput
                  id="password-sample"
                  value="love you 10_000 years"
                  disabled
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="message-sample">Message</FieldLabel>
                <Textarea
                  id="message-sample"
                  value="Somehow everything comes with an expiry date."
                  disabled
                />
              </Field>
            </div>

            {/* INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <h3 className="text-base font-bold tracking-tight sm:text-lg">
                PREPROCESSING INPUT
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                Before anything is hidden, every input gets converted into a
                form the algorithm can actually work with.
              </p>

              <Accordion
                type="single"
                collapsible
                defaultValue={preprocessing[0]?.value}
              >
                {preprocessing.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.trigger}</AccordionTrigger>
                    <AccordionContent className="h-full">
                      <ol className="divide-border/60 flex flex-col divide-y pt-1">
                        {item.steps.map((step, i) => (
                          <li
                            key={step.label}
                            className="flex items-baseline gap-3 py-3 first:pt-0 last:pb-0"
                          >
                            <span className="text-muted-foreground w-5 shrink-0 text-xs tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-muted-foreground text-xs tracking-wide">
                                {step.label}
                              </p>
                              <code className="text-foreground mt-1 block text-xs text-wrap wrap-break-word sm:text-sm">
                                {step.value}
                              </code>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">02</h2>
          <div className="flex flex-col gap-7 md:flex-row">
            {/* INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  LOCAL BINARY PATTERN
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  Local Binary Pattern (LBP) is used to analyze the texture
                  around each pixel. By comparing a pixel with its surrounding
                  neighbors, the algorithm produces a binary pattern that
                  classifies the pixel as smooth or rough.
                </p>
              </div>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://youtu.be/wpAwdsubl1w"
                className="group inline-block w-max"
              >
                <span className="text-foreground group-hover:border-foreground inline-flex items-center gap-4 border-b border-transparent pb-0.5 text-sm sm:text-base">
                  Learn more about LBP
                  <ArrowUpRightIcon aria-hidden="true" />
                </span>
              </a>
            </div>

            {/* VISUALS */}
            <div className="w-full shrink-0 md:w-67">
              <CompareSlider
                beforeSrc="/cover.png"
                beforeLabel="cover.png"
                afterSrc="/lbp.png"
                afterLabel="lbp.png"
              />
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-6 md:flex-row md:items-start">
            {/* VISUALS */}
            <div className="w-full shrink-0 md:w-67">
              <ClassificationGrid map={sampleClassificationMap} />
            </div>

            {/* INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col md:items-end">
              <div className="flex w-full flex-col gap-4 md:w-min">
                <ClassificationCode map={sampleClassificationMap} />
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  These classifications are then combined to form a map of the
                  image's smooth and rough regions. The map guides the embedding
                  process by determining whether each pixel uses 1 or 2 LSBs,
                  and is recreated during extraction to follow the same
                  classification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
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
              Twister pseudorandom generator. The resulting sequence determines
              the order in which pixel coordinates are visited during embedding
              and can be reproduced during extraction with the same password.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-7 md:flex-row">
            {/* VISUALS */}
            <div className="w-full shrink-0 md:w-67">
              <PseudorandomGrid map={sampleClassificationMap} />
            </div>

            {/* INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                With pseudorandom selection, the embedding locations no longer
                follow an obvious sequential pattern. This reduces the
                likelihood of statistical detection by scattering modifications
                across the image rather than following a predictable linear
                path.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">04</h2>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h3 className="text-base font-bold tracking-tight sm:text-lg">
              LEAST SIGNIFICANT BIT
            </h3>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* INFORMATION */}
                <p className="text-muted-foreground min-w-0 flex-1 text-sm leading-relaxed sm:text-base">
                  This is where the previous two steps come together. The Local
                  Binary Pattern already decided how much each pixel can safely
                  hide. The Pseudorandom Pixel Selection already decided where
                  those bits go. The secret message is then embedded into the
                  least significant bits of the red and blue channels, following
                  the classification and traversal sequence until the message
                  has been fully embedded.
                </p>

                {/* VISUALS */}
                <div className="w-full shrink-0 md:w-67">
                  <LSBProcess
                    map={sampleClassificationMap}
                    message={sampleBinaryMessageStream}
                    // isExtraction={true}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* VISUALS */}
                <div className="w-full shrink-0 md:w-67">
                  <LSBProcess
                    map={sampleClassificationMap}
                    message={sampleBinaryMessageStream}
                    isExtraction={true}
                  />
                </div>

                {/* INFORMATION */}
                <p className="text-muted-foreground min-w-0 flex-1 text-sm leading-relaxed sm:text-base">
                  Extraction follows the same process in reverse. Using the same
                  password, the algorithm reproduces the pseudorandom pixel
                  order and classification map, then reads 1 or 2 bits from each
                  pixel according to its texture classification. The recovered
                  bit stream is then reconstructed into the original message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
