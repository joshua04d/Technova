import { requireSuperAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { error, status } = await requireSuperAdmin();

    if (error) {
        return NextResponse.json({ error }, { status });
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
        return NextResponse.json(
            { error: "userId is required" },
            { status: 400 }
        );
    }

    // Find the user
    const targetUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!targetUser) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }

    // Cannot promote to Super Admin
    if (targetUser.role === "SUPER_ADMIN") {
        return NextResponse.json(
            { error: "Cannot modify Super Admin" },
            { status: 403 }
        );
    }

    // Promote to Admin
    const updatedUser = await db.user.update({
        where: { id: userId },
        data: { role: "ADMIN", isApproved: true },
    });

    console.log("✅ User promoted to ADMIN:", updatedUser.email);

    return NextResponse.json({
        message: `${updatedUser.name} promoted to ADMIN ✅`,
        user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        },
    });
}