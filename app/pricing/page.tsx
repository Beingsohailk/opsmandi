export const metadata = {
  title: "Pricing | OpsMandi",
  description: "OpsMandi pe top spot kaise milta hai aur bid kaise lagti hai.",
};

const steps = [
  "Apni listing /submit page pe submit karo (free).",
  "Review ke baad listing live ho jaati hai.",
  "Top pe aane ke liye bid amount batao. Jo sabse zyada bid karega, wo #1 pe rahega.",
  "UPI se payment karo, aur screenshot email karo. Confirm hote hi bid active ho jaati hai.",
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <a href="/" className="text-sm text-neutral-400">← OpsMandi</a>
      <h1 className="mt-4 text-3xl font-bold text-white">Top spot kaise milta hai</h1>
      <p className="mt-2 text-neutral-400">
        OpsMandi pe listing free hai. Jo upar dikhna chahta hai, wo bid lagata hai.
        Zyada bid, upar ranking.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 p-4">
          <h2 className="font-semibold text-white">Free listing</h2>
          <p className="mt-1 text-2xl font-bold text-white">₹0</p>
          <p className="mt-2 text-sm text-neutral-400">
            Directory mein naam, tagline aur link. Ranking neeche rehti hai.
          </p>
        </div>
        <div className="rounded-xl border border-amber-400/70 bg-amber-400/5 p-4">
          <h2 className="font-semibold text-white">Bid se top spot</h2>
          <p className="mt-1 text-2xl font-bold text-white">₹499+ / 30 din</p>
          <p className="mt-2 text-sm text-neutral-400">
            Jitni bid, utni upar ranking. Slot 30 din ka hota hai, phir renew.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-white">Process</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-neutral-300">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-neutral-800 p-4 text-sm text-neutral-300">
        <p>UPI ID: <span className="font-mono">suhailkhann112@ybl</span></p>
        <p className="mt-1">Email: <span className="font-mono">sohailbagali768@gmail.com</span></p>
      </div>

      <p className="mt-6 text-xs text-neutral-500">
        Ranking sirf bid amount se tay hoti hai. Spam ya galat listings hum bina
        notice hata sakte hain. Bid 30 din ke baad expire ho jaati hai.
      </p>
    </main>
  );
}