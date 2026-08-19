import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "project",
    trigger: "What is this project all about?",
    content:
      "This project is based on a thesis study that proposes a texture-adaptive image steganography method using Local Binary Pattern (LBP) and pseudorandom pixel selection. Stego is the proof-of-concept application of the proposed method, allowing users to experiment with embedding and extracting hidden messages from images.",
  },
  {
    value: "formats",
    trigger: "What image formats are supported?",
    content:
      "The method was evaluated using lossless PNG, BMP, and TIFF images. These formats preserve the pixel-level changes required by the embedding and extraction process.",
  },
  {
    value: "capacity",
    trigger: "How much data can an image hold?",
    content: (
      <>
        The maximum capacity depends on the texture of the cover image. Smooth
        pixels can carry 2 bits (1 bit in the{" "}
        <span className="text-red-700 dark:text-red-300">red channel</span> and
        1 bit in the{" "}
        <span className="text-blue-700 dark:text-blue-300">blue channel</span>),
        while rough pixels can carry 4 bits (2 bits in the{" "}
        <span className="text-red-700 dark:text-red-300">red channel</span> and
        2 bits in the{" "}
        <span className="text-blue-700 dark:text-blue-300">blue channel</span>).
        As a result, images with more textured regions generally provide greater
        embedding capacity.
      </>
    ),
  },
  {
    value: "password",
    trigger: "Is any password supported?",
    content:
      "Yes, you can use a password of your choice, but the password cannot be left empty. The same password must be provided during extraction so the algorithm can reproduce the same pseudorandom pixel sequence and recover the hidden message.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      className="border-border/60 flex w-full max-w-2xl scroll-mt-14 flex-col gap-6 border-t px-2 py-16 sm:py-24"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-wide text-sky-900 dark:text-sky-300">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          QUESTIONS
        </h2>
      </div>

      <Accordion type="single" collapsible defaultValue="item-1">
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-sm leading-relaxed sm:text-base">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
