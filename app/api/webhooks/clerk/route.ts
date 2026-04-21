import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  console.log("CLERK WEBHOOK RECEIVED ✅");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return new Response("Missing webhook secret", { status: 500 });
  }

  console.log("WEBHOOK_SECRET exists:", !!process.env.CLERK_WEBHOOK_SECRET);
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  console.log("Event type:", eventType);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";

    console.log("Attempting to create user:", { clerkId: id, email, name });

    try {
      const user = await db.user.create({
        data: {
          clerkId: id,
          email: email,
          name: name,
          role: "STUDENT",
        },
      });
      console.log("✅ User created in database:", user);
    } catch (error: any) {
      console.error("❌ DB CREATE ERROR:", error?.message || error);
      return new Response("Database error", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";

    try {
      await db.user.update({
        where: { clerkId: id },
        data: { email, name },
      });
      console.log("✅ User updated in database:", email);
    } catch (error: any) {
      console.error("❌ DB UPDATE ERROR:", error?.message || error);
      return new Response("Database error", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await db.user.delete({
        where: { clerkId: id },
      });
      console.log("✅ User deleted from database:", id);
    } catch (error: any) {
      console.error("❌ DB DELETE ERROR:", error?.message || error);
      return new Response("Database error", { status: 500 });
    }
  }

  return new Response("Webhook processed", { status: 200 });
}


