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
const sample = [
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

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
            <div className="flex flex-col justify-between gap-6">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
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
              <ClassificationGrid map={sample} />
            </div>

            {/* INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col md:items-end">
              <div className="flex w-full flex-col gap-4 md:w-min">
                <ClassificationCode map={sample} />
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
      </div>
    </section>
  );
}
