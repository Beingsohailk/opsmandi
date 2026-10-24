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

type Listing = {
  id: string;
  type: string;
  name: string;
  tagline: string;
  website_url: string;
  category: string;
  bid_amount: number;
};

function buildHref(q: string, category: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const s = params.toString();
  return s ? `/?${s}` : "/";
}

function Card({ item, rank }: { item: Listing; rank: number }) {
  const sponsored = item.bid_amount > 0;
  return (
    <a
      href={item.website_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-start gap-4 rounded-xl border p-4 transition hover:bg-neutral-900 ${
        sponsored ? "border-amber-400/70 bg-amber-400/5" : "border-neutral-800"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-lg font-bold text-neutral-200">
        {item.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-white">
            #{rank} {item.name}
          </h3>
          {sponsored && (
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-black">
              TOP SPOT
            </span>
          )}
          <span className="ml-auto rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            {item.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-400">{item.tagline}</p>
        <p className="mt-2 text-xs text-neutral-500">Visit →</p>
      </div>
    </a>
  );
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
    .select("id,type,name,tagline,website_url,category,bid_amount")
    .eq("status", "approved")
    .order("bid_amount", { ascending: false })
    .order("name", { ascending: true });

  if (q) query = query.or(`name.ilike.%${q}%,tagline.ilike.%${q}%`);

  const { data, error } = await query;

  if (error) {
    return <p className="mt-10 text-neutral-300">Unable to load listings right now.</p>;
  }

  const all = (data ?? []) as Listing[];
  const freelancers = all.filter((l) => l.type === "freelancer");
  const tools = all.filter(
    (l) => l.type === "tool" && (!category || l.category === category)
  );

  return (
    <>
      <form action="/" className="mt-8 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search karo (jaise terraform, AWS, monitoring)"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">
          Search
        </button>
      </form>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Freelancers & Agencies</h2>
            <p className="mt-1 text-sm text-neutral-400">
              DevOps, Cloud aur Kubernetes ke experts jinhe hire kar sakte ho
            </p>
          </div>
          <a href="/submit" className="text-sm text-neutral-300 underline">
            Apna profile daalo
          </a>
        </div>

        {freelancers.length > 0 ? (
          <div className="mt-4 space-y-3">
            {freelancers.map((item, i) => (
              <Card key={item.id} item={item} rank={i + 1} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-neutral-700 p-6 text-center">
            <p className="font-semibold text-white">
              Yahan pehle freelancer bano
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Launch offer: pehle 30 din top spot free.
            </p>
            <a
              href="/submit"
              className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Profile submit karo
            </a>
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">DevOps Tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={buildHref(q, "")}
            className={`rounded-full border px-3 py-1 text-xs ${
              !category
                ? "border-white text-white"
                : "border-neutral-700 text-neutral-400"
            }`}
          >
            All
          </a>
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href={buildHref(q, c)}
              className={`rounded-full border px-3 py-1 text-xs ${
                category === c
                  ? "border-white text-white"
                  : "border-neutral-700 text-neutral-400"
              }`}
            >
              {c}
            </a>
          ))}
        </div>

        {tools.length > 0 ? (
          <div className="mt-4 space-y-3">
            {tools.map((item, i) => (
              <Card key={item.id} item={item} rank={i + 1} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-neutral-400">
            Koi tool nahi mila. Doosra search ya category try karo.
          </p>
        )}
      </section>
    </>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-semibold tracking-wide text-amber-400">OPSMANDI</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-5xl">
          India ke DevOps experts aur tools, ek jagah
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
          Freelancers hire karo, tools discover karo, aur apni listing ko top pe laao.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/submit"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black"
          >
            + Listing submit karo
          </a>
          <a
            href="/pricing"
            className="rounded-lg border border-neutral-600 px-5 py-2.5 text-sm text-neutral-200"
          >
            Top spot / Pricing
          </a>
        </div>

        <Suspense
          fallback={<p className="mt-10 text-neutral-500">Listings load ho rahi hain...</p>}
        >
          <Directory searchParams={searchParams} />
        </Suspense>

        <footer className="mt-20 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          <span>OpsMandi, Made in India</span>
          <a href="/pricing" className="hover:text-neutral-300">Pricing</a>
          <a href="/submit" className="hover:text-neutral-300">Submit</a>
        </footer>
      </main>
    </div>
  );
}