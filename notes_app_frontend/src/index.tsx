import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/theme.css";

// Mount the Notes app UI for managing and previewing note videos
const container =
  typeof document !== "undefined"
    ? document.getElementById("root")
    : null;
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

// Also register the Remotion root so CLI/studio can still use compositions if needed
// Note: Remotion Studio will mount its own root when invoking `npm run dev`.
// For bundling/rendering via CLI, the old entry is still available as src/index.ts
// (we keep existing file at src/index.ts used by Remotion CLI).
