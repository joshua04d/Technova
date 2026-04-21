import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Users, DollarSign, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

export default async function SuperAdminDashboard() {
    const user = await getCurrentUser();

    if (!user) redirect("/");
    if (user.role !== "SUPER_ADMIN") redirect("/dashboard");

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <Shield className="text-purple-600" size={32} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Super Admin Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Full platform control and analytics
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Users className="text-blue-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <DollarSign className="text-green-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">₹0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-purple-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">₹0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Shield className="text-red-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Banned Users</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/dashboard/super-admin/users"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
                        >
                            <Users size={20} />
                            Manage Users
                        </Link>
                        <Link
                            href="/dashboard/super-admin/crm"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
                        >
                            <TrendingUp size={20} />
                            CRM Dashboard
                        </Link>
                    </div>
                </div>

                {/* Role Badge */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <p className="text-purple-800 text-sm font-medium">
                        🔐 Logged in as Super Admin: {user.name} ({user.email})
                    </p>
                </div>
            </div>
        </div>
    );
}