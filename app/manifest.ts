import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FC Poto · Football Club de Toulouse",
    short_name: "FC Poto",
    description: "Club de football amateur basé à Toulouse · saison 2025/2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2EDE4",
    theme_color: "#0C1537",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
