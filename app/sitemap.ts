import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.domain, priority: 1 },
    { url: `${siteConfig.domain}/demo/rfq-intake`, priority: 0.7 },
  ];
}
