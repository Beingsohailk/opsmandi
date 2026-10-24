import { Suspense } from "react";
import { isAdmin } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase-admin";
import { login, updateListing } from "./actions";

async function Panel() {
  if (!(await isAdmin())) {
    return (
      <form action={login} className="mt-8 max-w-sm space-y-3">
        <label className="block text-sm">
          Admin password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-transparent px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2 font-semibold text-black"
        >
          Login
        </button>
      </form>
    );
  }

  const { data: items, error } = await getAdminClient()
    .from("listings")
    .select("*")
    .order("status", { ascending: true })
    .order("bid_amount", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="mt-8 text-red-400">Listings load nahi hui. Database settings check karo.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      {(!items || items.length === 0) && (
        <p className="text-gray-400">Abhi koi listing nahi hai.</p>
      )}

      {items?.map((listing) => (
        <form
          key={listing.id}
          action={updateListing}
          className="rounded-xl border border-gray-700 p-4"
        >
          <input type="hidden" name="id" value={listing.id} />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">{listing.name}</h2>
            <span className="text-xs text-gray-400">
              {listing.status} · {listing.type}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-400">{listing.tagline}</p>
          <p className="mt-1 text-xs text-gray-500">{listing.category}</p>

          <a
            href={listing.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block break-all text-sm underline"
          >
            {listing.website_url}
          </a>

          {listing.description && (
            <p className="mt-2 text-sm">{listing.description}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label className="text-sm">
              Bid amount
              <input
                name="bid"
                type="number"
                min="0"
                step="1"
                defaultValue={listing.bid_amount ?? 0}
                className="ml-2 w-28 rounded border border-gray-700 bg-transparent px-2 py-1"
              />
            </label>

            {listing.status === "pending" && (
              <button
                type="submit"
                name="intent"
                value="approve"
                className="rounded bg-green-700 px-3 py-2 text-sm"
              >
                Approve
              </button>
            )}

            <button
              type="submit"
              name="intent"
              value="bid"
              className="rounded bg-gray-700 px-3 py-2 text-sm"
            >
              Save bid
            </button>

            <button
              type="submit"
              name="intent"
              value="delete"
              formNoValidate
              className="rounded bg-red-800 px-3 py-2 text-sm"
            >
              Delete
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}


export default function AdminPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <a href="/" className="text-sm text-gray-400">
        ← OpsMandi homepage
      </a>

      <h1 className="mt-4 text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-400">
        Listings review karo, approve karo aur bid ranking manage karo.
      </p>

      <Suspense
        fallback={<p className="mt-8 text-gray-500">Loading dashboard...</p>}
      >
        <Panel />
      </Suspense>
    </main>
  );
}
