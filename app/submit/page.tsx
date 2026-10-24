import { submitListing } from "./actions";

const input =
  "mt-1 w-full rounded-lg border border-gray-700 bg-transparent px-3 py-2";

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <a href="/" className="text-sm text-gray-400">
        ← OpsMandi
      </a>

      <h1 className="mt-4 text-3xl font-bold">
        Apni listing submit karo
      </h1>

      <p className="mt-2 text-gray-400">
        Details submit karo. Review aur approval ke baad listing live hogi.
      </p>

      <form action={submitListing} className="mt-8 space-y-4">
        <label className="block text-sm">
          Type
          <select name="type" className={input} defaultValue="tool">
            <option value="tool">Tool / Product</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </label>

        <label className="block text-sm">
          Naam
          <input
            name="name"
            required
            maxLength={80}
            className={input}
            placeholder="Jaise: My DevOps Tool"
          />
        </label>

        <label className="block text-sm">
          Tagline
          <input
            name="tagline"
            required
            maxLength={140}
            className={input}
            placeholder="Ek line mein apni listing ke baare mein"
          />
        </label>

        <label className="block text-sm">
          Category
          <input
            name="category"
            required
            maxLength={40}
            className={input}
            placeholder="Jaise: CI/CD, Monitoring, AWS"
          />
        </label>

        <label className="block text-sm">
          Website / Profile link
          <input
            name="website_url"
            type="url"
            required
            className={input}
            placeholder="https://example.com"
          />
        </label>

        <label className="block text-sm">
          Description (optional)
          <textarea
            name="description"
            rows={4}
            maxLength={1000}
            className={input}
            placeholder="Apne tool ya service ki details likho"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2 font-semibold text-black"
        >
          Submit Listing
        </button>
      </form>
    </main>
  );
}
