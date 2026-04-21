import { requireSuperAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const { error, status, user } = await requireSuperAdmin();

    if (error) {
        return NextResponse.json({ error }, { status });
    }

    return NextResponse.json({
        message: "Super Admin route works ✅",
        user: {
            name: user!.name,
            role: user!.role,
        },
    });
}