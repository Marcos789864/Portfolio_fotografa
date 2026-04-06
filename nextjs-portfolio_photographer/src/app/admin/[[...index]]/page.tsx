"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function AdminPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Si ves este texto pero no el panel, falta una dependencia */}
      <div style={{ position: "absolute", zIndex: -1 }}>Cargando Panel de Mila...</div>
      <NextStudio config={config} />
    </div>
  );
}