import { requireRole } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const { error, status, user } = await requireRole(["ADMIN", "SUPER_ADMIN"]);

    if (error) {
        return NextResponse.json({ error }, { status });
    }

    return NextResponse.json({
        message: "Admin route works ✅",
        user: {
            name: user!.name,
            role: user!.role,
        },
    });
}