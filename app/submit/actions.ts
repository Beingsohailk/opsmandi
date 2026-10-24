"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function submitListing(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const website_url = String(formData.get("website_url") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  if (!["tool", "freelancer"].includes(type)) {
    throw new Error("Invalid listing type");
  }

  if (!name || !tagline || !category || !website_url) {
    throw new Error("Required fields missing");
  }

  if (
    name.length > 80 ||
    tagline.length > 140 ||
    description.length > 1000 ||
    category.length > 40
  ) {
    throw new Error("Input length exceeded");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(website_url);
  } catch {
    throw new Error("Valid website URL enter karo");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("URL http ya https se shuru hona chahiye");
  }

  const { error } = await supabase.from("listings").insert({
    type,
    name,
    tagline,
    description,
    website_url: parsedUrl.toString(),
    category,
    bid_amount: 0,
    status: "pending",
  });

  if (error) {
    console.error("Listing submission failed:", error.message);
    throw new Error("Submit fail hua. Dobara try karo.");
  }

  redirect("/submit/thanks");
}
