import { requireSuperAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const { error, status } = await requireSuperAdmin();

    if (error) {
        return NextResponse.json({ error }, { status });
    }

    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isApproved: true,
            isBanned: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users });
}