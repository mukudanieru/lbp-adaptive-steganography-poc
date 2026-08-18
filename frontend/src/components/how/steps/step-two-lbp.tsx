import { ArrowUpRightIcon } from "@phosphor-icons/react";
import CompareSlider from "../classification/compare-slider";
import { ClassificationGrid } from "../classification/classification-grid";
import { ClassificationCode } from "../classification/classification-code";
import { sampleClassificationMap } from "../sample-data";

export default function StepTwoLbp() {
  return (
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
              Local Binary Pattern (LBP) is used to analyze the texture around
              each pixel. By comparing a pixel with its surrounding neighbors,
              the algorithm produces a binary pattern that classifies the pixel
              as smooth or rough.
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
              process by determining whether each pixel uses 1 or 2 LSBs, and is
              recreated during extraction to follow the same classification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
