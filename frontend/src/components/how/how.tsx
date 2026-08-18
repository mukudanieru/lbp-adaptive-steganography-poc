import StepOnePreprocessing from "./steps/step-one-preprocessing";
import StepTwoLbp from "./steps/step-two-lbp";
import StepThreePseudorandom from "./steps/step-three-pseudorandom";
import StepFourLsb from "./steps/step-four-lsb";

export default function How() {
  return (
    <section className="border-border/60 flex w-full max-w-2xl flex-col gap-12 border-t px-2 py-16 sm:py-24">
      <p className="text-xs font-semibold tracking-wide text-sky-400">HOW</p>

      <div className="flex flex-col gap-32">
        <StepOnePreprocessing />
        <StepTwoLbp />
        <StepThreePseudorandom />
        <StepFourLsb />
      </div>
    </section>
  );
}
