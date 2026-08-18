import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmbedForm from "./components/embed-form";
import ExtractForm from "./components/extract-form";
import { DetectiveIcon } from "@phosphor-icons/react";
import Navbar from "./components/navbar";
import About from "./components/about";
import How from "./components/how/how";
import Faq from "./components/faq";

function App() {
  return (
    <div className="flex min-h-dvh flex-col items-center overflow-x-hidden px-6">
      <Navbar />

      <section className="justify-[safe_center] flex min-h-dvh w-full max-w-2xl flex-col pt-28 pb-14">
        <header className="flex flex-col items-center px-2 py-4">
          <div className="flex items-center gap-3">
            <DetectiveIcon className="h-8 w-8" />
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Stego
            </h1>
          </div>
          <p className="text-muted-foreground mt-3 max-w-md text-center text-sm sm:text-base">
            Texture-Adaptive Image Steganography using Local Binary Pattern and
            Pseudorandom Pixel Selection
          </p>
        </header>

        <main className="px-2 py-4">
          <Tabs defaultValue="embed" className="flex flex-1 flex-col gap-4">
            <TabsList className="w-full">
              <TabsTrigger value="embed" className="flex-1">
                Embed
              </TabsTrigger>
              <TabsTrigger value="extract" className="flex-1">
                Extract
              </TabsTrigger>
            </TabsList>
            <TabsContent value="embed">
              <EmbedForm />
            </TabsContent>
            <TabsContent value="extract">
              <ExtractForm />
            </TabsContent>
          </Tabs>
        </main>
      </section>

      <About />

      <How />

      <Faq />
    </div>
  );
}

export default App;
