import { DetectiveIcon } from "@phosphor-icons/react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6">
      <div className="border-border bg-background pointer-events-auto flex items-center gap-1 overflow-x-auto rounded-full border p-1.5 whitespace-nowrap shadow-sm">
        <button
          aria-label="Stego home"
          className="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold tracking-tighter transition"
        >
          <DetectiveIcon weight="fill" size={18} />
          <span>Stego</span>
        </button>

        <div className="mx-1 h-4 w-px bg-white/10"></div>

        <div className="flex items-center gap-1">
          <button className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-3.5 py-2 text-sm font-medium transition">
            About
          </button>
          <button className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full px-3.5 py-2 text-sm font-medium transition">
            FAQ
          </button>
        </div>

        <ModeToggle />

        <div className="bg-border mx-1 h-4 w-px"></div>

        <a
          href="https://github.com/mukudanieru/lbp-adaptive-steganography-poc"
          target="_blank"
          rel="noreferrer noopener"
          className="border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
}
