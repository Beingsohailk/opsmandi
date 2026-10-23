import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

async function Listings() {
  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "approved")
    .order("bid_amount", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);

    return (
      <p className="mt-8 text-red-400">
        Listings load nahi ho paayi. Please refresh and try again.
      </p>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <p className="mt-8 text-gray-400">
        Abhi koi approved listing available nahi hai.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
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

            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs">
              {item.category}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            {item.tagline}
          </p>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">OpsMandi</h1>

      <p className="mt-2 text-gray-400">
        India ka DevOps tools aur cloud services directory.
      </p>

      <Suspense
        fallback={
          <p className="mt-8 text-gray-400">
            Listings load ho rahi hain...
          </p>
        }
      >
        <Listings />
      </Suspense>
    </main>
  );
}
