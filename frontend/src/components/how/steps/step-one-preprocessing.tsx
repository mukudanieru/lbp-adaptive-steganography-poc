import { Field, FieldLabel } from "../../ui/field";
import PasswordInput from "../../password-input";
import { Textarea } from "../../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ImageCard from "../image-card";
import { preprocessingSteps } from "../sample-data";

export default function StepOnePreprocessing() {
  return (
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
            Before anything is hidden, every input gets converted into a form
            the algorithm can actually work with.
          </p>

          <Accordion
            type="single"
            collapsible
            defaultValue={preprocessingSteps[0]?.value}
          >
            {preprocessingSteps.map((item) => (
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
  );
}
