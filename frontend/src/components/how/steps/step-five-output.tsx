import { Button } from "@/components/ui/button";
import ImageCard from "../image-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StepFiveOutput() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">05</h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold tracking-tight sm:text-lg">
          OUTPUT
        </h3>

        <p className="text-muted-foreground w-full text-sm leading-relaxed sm:text-base">
          The process is now complete. Starting with the original cover image,
          the algorithm analyzes its texture, selects embedding locations, and
          hides the message to produce the final stego-image shown below.
        </p>

        <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="min-w-0 flex-1">
            <ImageCard imgSrc="/cover.png" />
          </div>
          <div className="min-w-0 flex-1">
            <ImageCard imgSrc="/lbp.png" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <ImageCard imgSrc="/stego.png" />

            <Tooltip>
              <a href="/stego.png" download="stego.png" className="w-full">
                <TooltipTrigger asChild className="w-full">
                  <Button
                    className="w-full hover:cursor-pointer"
                    variant={"outline"}
                  >
                    Download
                  </Button>
                </TooltipTrigger>
              </a>

              <TooltipContent side="bottom" className="max-w-50 text-center">
                <p>
                  Download the stego-image and try extracting the hidden message
                  using the password from Step 1.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
