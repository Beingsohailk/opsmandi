
export const metadata = {
  title: "Listing submitted | OpsMandi",
};

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">
        Thank you! 🎉
      </h1>

      <p className="mt-3 text-neutral-400">
        Tumhari listing submit ho gayi hai. Review aur approval ke baad
        woh OpsMandi par dikhai degi.
      </p>

      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black"
      >
        Homepage par jao
      </a>
    </main>
  );
}
