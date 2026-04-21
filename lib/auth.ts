import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

// Get current logged in user from database
export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
    });

    return user;
}

// Check if user has required role
export function hasRole(
    userRole: UserRole,
    allowedRoles: UserRole[]
): boolean {
    return allowedRoles.includes(userRole);
}

// Require authentication - returns user or throws
export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        return {
            error: "Unauthorized - Please login",
            status: 401,
            user: null,
        };
    }

    if (user.isBanned) {
        return {
            error: "Your account has been banned",
            status: 403,
            user: null,
        };
    }

    return { error: null, status: 200, user };
}

// Require specific role
export async function requireRole(allowedRoles: UserRole[]) {
    const { error, status, user } = await requireAuth();

    if (error || !user) {
        return { error, status, user: null };
    }

    if (!hasRole(user.role, allowedRoles)) {
        return {
            error: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
            status: 403,
            user: null,
        };
    }

    return { error: null, status: 200, user };
}

// Require Super Admin specifically
export async function requireSuperAdmin() {
    const { error, status, user } = await requireRole(["SUPER_ADMIN"]);

    if (error || !user) {
        return { error, status, user: null };
    }

    // Double check against env variable
    const superAdminId = process.env.SUPER_ADMIN_ID;

    if (superAdminId && user.id !== superAdminId) {
        console.error("⚠️ SECURITY ALERT: Unauthorized Super Admin access attempt", {
            userId: user.id,
            email: user.email,
        });
        return {
            error: "Access denied",
            status: 403,
            user: null,
        };
    }

    return { error: null, status: 200, user };
}