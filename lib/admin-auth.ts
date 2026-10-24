import { cookies } from "next/headers";
import { createHash } from "crypto";

export function adminToken() {
  return createHash("sha256")
    .update(process.env.ADMIN_PASSWORD ?? "")
    .digest("hex");
}

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;

  const jar = await cookies();

  return jar.get("admin")?.value === adminToken();
}
