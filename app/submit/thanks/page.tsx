export const metadata = {
  title: "Shukriya | OpsMandi",
};

export default function Thanks() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-white">Shukriya! 🎉</h1>
      <p className="mt-3 text-neutral-400">
        Tumhari listing mil gayi. Review ke baad wo live ho jayegi.
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        Top spot chahiye? Pricing page pe bid ka tarika dekho.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="/"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200"
        >
          Homepage pe jao
        </a>
        <a
          href="/pricing"
          className="rounded-lg border border-neutral-600 px-5 py-2.5 text-sm text-neutral-200 hover:bg-neutral-900"
        >
          Top spot / Pricing
        </a>
      </div>
    </main>
  );
}