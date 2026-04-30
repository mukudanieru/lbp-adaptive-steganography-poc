import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmbedForm from "./components/embed-form";
import ExtractForm from "./components/extract-form";
import { DetectiveIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Stego";
  }, []);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-2xl">
        <header className="flex flex-col items-center p-4">
          <div className="flex items-center gap-2">
            <DetectiveIcon className="h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">Stego</h1>
          </div>

          <p className="text-muted-foreground mt-2 text-center text-sm">
            Texture-Adaptive Image Steganography Using Local Binary Pattern and
            Pseudorandom Pixel Selection
          </p>
        </header>

        <main className="px-4">
          <Tabs defaultValue="embed" className="flex flex-1 flex-col">
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
      </div>
    </div>
  );
}

export default App;
