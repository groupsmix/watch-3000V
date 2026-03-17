import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/admin", "/login", "/login/"],
      },
    ],
    sitemap: "https://wristnerd.xyz/sitemap.xml",
  };
}
