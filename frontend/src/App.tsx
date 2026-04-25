import { useQuery } from "@tanstack/react-query";
import { getHello } from "@/lib/hello";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: getHello,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </ThemeProvider>
  );
}

export default App;
