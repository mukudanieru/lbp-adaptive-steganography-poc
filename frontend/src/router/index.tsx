import { createBrowserRouter } from "react-router";

import App from "@/App";
import EmbedPage from "@/pages/embed-page";
import ExtractPage from "@/pages/extract-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "embed",
        element: <EmbedPage />,
      },
      {
        path: "extract",
        element: <ExtractPage />,
      },
    ],
  },
]);
