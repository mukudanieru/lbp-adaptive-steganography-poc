import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  InfoIcon,
} from "@phosphor-icons/react";

const modifications = [
  {
    channel: "R",
    channelValue: 42,
    original: "00101010",
    secretBit: "1",
    modified: "00101011",
    integer: 43,
  },
  {
    channel: "G",
    channelValue: 87,
    original: "01010111",
    secretBit: "0",
    modified: "01010110",
    integer: 86,
  },
  {
    channel: "B",
    channelValue: 32,
    original: "00100000",
    secretBit: "1",
    modified: "00100001",
    integer: 33,
  },
];

export default function About() {
  return (
    <section className="border-border/60 flex w-full max-w-2xl flex-col gap-6 border-t px-2 py-16 sm:py-24">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-wide text-sky-300">
          ABOUT
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          What is steganography?
        </h2>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        Steganography is the art of concealing information in cover media, such
        as digital images{" "}
        <a
          className="text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer noopener"
          href="https://doi.org/10.1109/ACCESS.2024.3468988"
        >
          (Rafat &amp; Sajjad, 2024)
        </a>
        .
      </p>

      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        Among the various techniques used in steganography, Least Significant
        Bit (LSB) substitution is widely used because of its simplicity and high
        embedding capacity.
      </p>

      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        Each pixel in a standard digital image is represented by three numerical
        values corresponding to the <span className="text-red-300">red</span>,{" "}
        <span className="text-green-300">green</span>, and{" "}
        <span className="text-blue-300">blue</span> (RGB) color channels,
        typically ranging from 0 to 255. The least significant bit is the
        lowest-order bit in the binary representation of these values.
      </p>

      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
        <div className="flex flex-col items-center gap-3">
          <div className="h-28 w-28 rounded-xl bg-[rgb(42,87,32)] sm:h-32 sm:w-32" />
          <Badge variant="outline">rgb(42, 87, 32)</Badge>
        </div>

        <div className="w-full overflow-x-auto md:w-auto">
          <Table>
            <TableCaption>After modification.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xs sm:text-sm">
                  CHANNEL
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  ORIGINAL
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  SECRET BIT
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  MODIFIED
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  INTEGER
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modifications.map((m, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <div
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          m.channel === "R"
                            ? `rgb(${m.channelValue}, 0, 0)`
                            : m.channel === "G"
                              ? `rgb(0, ${m.channelValue}, 0)`
                              : `rgb(0, 0, ${m.channelValue})`,
                      }}
                    />
                    <span>
                      {m.channel} ({m.channelValue})
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {m.original}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {m.secretBit}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {m.modified}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {m.integer}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        LSB substitution hides information by replacing the least significant
        bit of a pixel value with a secret bit. Because this changes the pixel
        value by at most one, the resulting visual difference is generally
        difficult to notice.
      </p>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
        <div className="flex flex-col items-center gap-3">
          <span className="text-muted-foreground text-xs">
            without secret bit
          </span>
          <div className="h-20 w-20 rounded-xl bg-[rgb(42,87,32)] sm:h-22 sm:w-22" />
          <Badge variant="outline">rgb(42, 87, 32)</Badge>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ArrowRightIcon
            size={16}
            className="rotate-90 sm:rotate-0"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge>
              <span className="text-[rgb(43,0,0)]">R +1</span>
            </Badge>
            <Badge>
              <span className="text-[rgb(0,86,0)]">G -1</span>
            </Badge>
            <Badge>
              <span className="text-[rgb(0,0,33)]">B +1</span>
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-muted-foreground text-xs">with secret bit</span>
          <div className="h-20 w-20 rounded-xl bg-[rgb(43,86,33)] sm:h-22 sm:w-22" />
          <Badge variant="outline">rgb(43, 86, 33)</Badge>
        </div>
      </div>

      <Alert className="mt-12">
        <InfoIcon />
        <AlertTitle>ABOUT STEGO</AlertTitle>
        <AlertDescription>
          The name “Stego” is short for steganography. Learn more&nbsp;about{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            // href="https://exo.substack.com/p/the-exo-guide-to-data-cloaking?utm_campaign=post-expanded-share&utm_medium=web"
            href="https://youtu.be/TWEXCYQKyDc"
            className="group inline-block w-max"
          >
            <span className="text-foreground group-hover:border-foreground inline-flex items-center gap-1 border-b border-transparent pb-0.5">
              steganography
              <ArrowUpRightIcon size={12} aria-hidden="true" />
            </span>
          </a>
        </AlertDescription>
      </Alert>

      {/* <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        What is this project all about?
      </h2>

      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
        This project is based on a thesis study that proposes a texture-adaptive
        image steganography method using Local Binary Pattern (LBP) and
        pseudorandom pixel selection. Stego serves as a proof-of-concept
        application of the proposed method, allowing users to experiment with
        embedding and extracting hidden messages from images.
      </p> */}
    </section>
  );
}
