import type { MetadataRoute } from "next";

const description =
  "Barriguitas es el sistema operativo familiar de Victoria y Gonzalo.";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Barriguitas",
    short_name: "Barriguitas",
    description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    lang: "es",
  };
}
