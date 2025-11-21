// temporary test in src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{padding:20}}>Testing React render — If you see this, React core is fine.</div>
  </React.StrictMode>
);
