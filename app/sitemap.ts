import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/terms", "/privacy"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.3,
  }));
}
