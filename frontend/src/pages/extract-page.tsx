import { api } from "@/lib/api";
import { useEffect } from "react";

export default function ExtractPage() {
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await api.get("/health");
        console.log(response.data);
      } catch (error) {
        console.error("Health check failed:", error);
      }
    };

    fetchHealth();
  }, []);

  return <div>ExtractPage</div>;
}
