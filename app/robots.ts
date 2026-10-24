export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: "https://opsmandi.vercel.app/sitemap.xml",
  };
}