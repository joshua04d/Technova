import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const clerkId = process.env.SUPER_ADMIN_CLERK_ID;
    const email = process.env.SUPER_ADMIN_EMAIL;
    const name = process.env.SUPER_ADMIN_NAME;

    if (!clerkId || !email || !name) {
        throw new Error(
            "Missing SUPER_ADMIN_CLERK_ID, SUPER_ADMIN_EMAIL, or SUPER_ADMIN_NAME in .env"
        );
    }

    console.log("Seeding Super Admin...");

    const superAdmin = await db.user.upsert({
        where: { clerkId },
        update: {
            role: "SUPER_ADMIN",
            isApproved: true,
        },
        create: {
            clerkId,
            email,
            name,
            role: "SUPER_ADMIN",
            isApproved: true,
        },
    });

    console.log("✅ Super Admin seeded:", superAdmin);
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });