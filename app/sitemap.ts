export default function sitemap() {
  const base = "https://opsmandi.vercel.app";
  
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/submit`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.6 },
  ];
}