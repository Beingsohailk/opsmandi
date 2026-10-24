import { submitListing } from "./actions";

const input =
  "mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-neutral-400 focus:outline-none";

export const metadata = {
  title: "Listing submit karo | OpsMandi",
};

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <a href="/" className="text-sm text-neutral-400 hover:text-neutral-200">
        ← OpsMandi
      </a>
      <h1 className="mt-4 text-3xl font-bold text-white">Apni listing submit karo</h1>
      <p className="mt-2 text-neutral-400">
        Details submit karo. Review aur approval ke baad listing live hogi.
      </p>

      <form action={submitListing} className="mt-8 space-y-5">
        <label className="block text-sm text-neutral-200">
          Type
          <select name="type" defaultValue="freelancer" className={input}>
            <option value="freelancer">Freelancer / Agency</option>
            <option value="tool">Tool / Product</option>
          </select>
        </label>

        <label className="block text-sm text-neutral-200">
          Naam
          <input
            name="name"
            required
            maxLength={80}
            placeholder="Jaise: Rakesh K. ya My DevOps Tool"
            className={input}
          />
        </label>

        <label className="block text-sm text-neutral-200">
          Tagline
          <input
            name="tagline"
            required
            maxLength={140}
            placeholder="Ek line mein apne baare mein"
            className={input}
          />
        </label>

        <label className="block text-sm text-neutral-200">
          Category
          <input
            name="category"
            required
            maxLength={40}
            list="categories"
            placeholder="Jaise: AWS, Kubernetes, CI/CD, Monitoring"
            className={input}
          />
          <datalist id="categories">
            <option value="AWS" />
            <option value="Azure" />
            <option value="Kubernetes" />
            <option value="Terraform" />
            <option value="CI/CD" />
            <option value="Monitoring" />
            <option value="Security" />
            <option value="Containers" />
            <option value="IaC" />
            <option value="Logging" />
            <option value="Web Server" />
          </datalist>
        </label>

        <label className="block text-sm text-neutral-200">
          Website / Profile link
          <input
            name="website_url"
            type="url"
            required
            placeholder="https://linkedin.com/in/tumhara-naam"
            className={input}
          />
        </label>

        <label className="block text-sm text-neutral-200">
          Description (optional)
          <textarea
            name="description"
            rows={4}
            maxLength={1000}
            placeholder="Apni service ya tool ki details likho"
            className={input}
          />
        </label>

        <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200">
          Submit Listing
        </button>
      </form>
    </main>
  );
}
