import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const items = [
  {
    value: "item-1",
    trigger: "What is this project all about?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos nostrum, officiis commodi odio quisquam, velit hic eaque qui nihil ullam quos perferendis perspiciatis cum laboriosam voluptate obcaecati reiciendis quam.",
  },
  {
    value: "item-2",
    trigger: "What image formats are supported?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos nostrum, officiis commodi odio quisquam, velit hic eaque qui nihil ullam quos perferendis perspiciatis cum laboriosam voluptate obcaecati reiciendis quam.",
  },
  {
    value: "item-3",
    trigger: "How much data can an image hold?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos nostrum, officiis commodi odio quisquam, velit hic eaque qui nihil ullam quos perferendis perspiciatis cum laboriosam voluptate obcaecati reiciendis quam.",
  },
  {
    value: "item-4",
    trigger: "Is any password supported?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eos nostrum, officiis commodi odio quisquam, velit hic eaque qui nihil ullam quos perferendis perspiciatis cum laboriosam voluptate obcaecati reiciendis quam.",
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
        {items.map((item) => (
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
