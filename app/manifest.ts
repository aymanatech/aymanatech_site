import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#1760e0",
    icons: [
      { src: "/brand/aymana-tech-mark-128.png", sizes: "128x128", type: "image/png" },
      { src: "/brand/aymana-tech-mark.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
