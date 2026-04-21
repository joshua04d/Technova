import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    // Redirect based on role
    if (user.role === "SUPER_ADMIN") {
        redirect("/dashboard/super-admin");
    }

    if (user.role === "ADMIN") {
        redirect("/dashboard/admin");
    }

    if (user.role === "REVIEWER") {
        redirect("/dashboard/reviewer");
    }

    // Default: STUDENT
    redirect("/dashboard/student");
}