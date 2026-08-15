import { Field, FieldLabel } from "./ui/field";
import PasswordInput from "./password-input";
import { Textarea } from "./ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function How() {
  return (
    <section className="border-border/60 flex w-full max-w-2xl flex-col gap-12 border-t px-2 py-16 sm:py-24">
      <p className="text-xs font-semibold tracking-wide text-sky-300">HOW</p>

      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">01</h2>

          <div className="flex flex-col gap-7 md:flex-row">
            <div className="w-full shrink-0 space-y-4 md:w-67">
              <div className="bg-card flex flex-col justify-between px-1.5 pt-1.5 pb-1">
                <img
                  className="aspect-square h-auto w-full object-cover md:h-67 md:w-67"
                  src="/cover.png"
                  alt="cover.png"
                />
                <span className="pt-2 text-xs font-light">cover.png</span>
              </div>

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

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">02</h2>
        </div>
      </div>
    </section>
  );
}
