import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

export const instant = false;

const CATEGORIES = [
  "Containers",
  "IaC",
  "CI/CD",
  "Monitoring",
  "Logging",
  "Security",
  "Web Server",
];

function buildHref(q: string, category: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const s = params.toString();
  return s ? `/?${s}` : "/";
}

async function Directory({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").replace(/[,()%*\\]/g, " ").trim().slice(0, 60);
  const category = CATEGORIES.includes(sp.category ?? "") ? sp.category! : "";

  let query = supabase
    .from("listings")
    .select("*")
    .eq("status", "approved")
    .order("bid_amount", { ascending: false })
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);
  if (q) query = query.or(`name.ilike.%${q}%,tagline.ilike.%${q}%`);

  const { data: listings, error } = await query;

  return (
    <>
      <form action="/" className="mt-6 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Tools search karo (jaise docker, monitoring)"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={buildHref(q, "")}
          className={`rounded-full border px-3 py-1 text-xs ${
            !category ? "border-gray-300" : "border-gray-700"
          }`}
        >
          All
        </a>
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href={buildHref(q, c)}
            className={`rounded-full border px-3 py-1 text-xs ${
              category === c ? "border-gray-300" : "border-gray-700"
            }`}
          >
            {c}
          </a>
        ))}
      </div>

      {error ? (
        <p className="mt-8">Unable to load listings right now.</p>
      ) : listings && listings.length > 0 ? (
        <div className="mt-6 space-y-4">
          {listings.map((item, i) => (
            <a
              key={item.id}
              href={item.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-gray-700 p-4 hover:border-gray-400"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  #{i + 1} {item.name}
                </h2>
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-100">
                  {item.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{item.tagline}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-400">
          Koi listing nahi mili. Doosra search ya category try karo.
        </p>
      )}
    </>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">OpsMandi</h1>
      <p className="mt-2 text-gray-400">
        India ka DevOps tools aur cloud services directory.
      </p>
      <a
        href="/submit"
        className="mt-4 inline-block rounded-lg border border-gray-600 px-4 py-2 text-sm"
      >
        + Listing submit karo
      </a>
      <a
  href="/pricing"
  className="mt-4 ml-2 inline-block rounded-lg border border-gray-600 px-4 py-2 text-sm"
      >
        Top spot / Pricing
      </a>

      <Suspense
        fallback={<p className="mt-8 text-gray-400">Listings load ho rahi hain...</p>}
      >
        <Directory searchParams={searchParams} />
      </Suspense>
    </main>
  );
}