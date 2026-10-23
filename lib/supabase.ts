import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase env missing: NEXT_PUBLIC_SUPABASE_URL aur ANON_KEY (ya PUBLISHABLE_KEY) set karo"
  );
}

export const supabase = createClient(url, key);