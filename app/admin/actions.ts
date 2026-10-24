"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminToken, isAdmin } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase-admin";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (
    !process.env.ADMIN_PASSWORD ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    redirect("/admin?error=1");
  }

  const jar = await cookies();

  jar.set("admin", adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function updateListing(formData: FormData) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "");
  const intent = String(formData.get("intent") ?? "");
  const bidRaw = String(formData.get("bid") ?? "0");
  const bid = Number(bidRaw);

  if (!id) throw new Error("Listing ID missing");

  if (!["approve", "bid", "delete"].includes(intent)) {
    throw new Error("Invalid action");
  }

  if (
    intent !== "delete" &&
    (!Number.isSafeInteger(bid) || bid < 0)
  ) {
    throw new Error("Bid amount valid non-negative integer hona chahiye");
  }

  const db = getAdminClient();

  if (intent === "delete") {
    const { error } = await db.from("listings").delete().eq("id", id);
    if (error) throw new Error("Listing delete nahi hui");
  } else if (intent === "approve") {
    const { error } = await db
      .from("listings")
      .update({ status: "approved", bid_amount: bid })
      .eq("id", id);

    if (error) throw new Error("Listing approve nahi hui");
  } else {
    const { error } = await db
      .from("listings")
      .update({ bid_amount: bid })
      .eq("id", id);

    if (error) throw new Error("Bid update nahi hui");
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
