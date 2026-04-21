import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FileText, Users, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const user = await getCurrentUser();

    if (!user) redirect("/");
    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage submissions, reviewers and journals
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Total Submissions</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Clock className="text-yellow-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Pending Review</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Users className="text-green-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Total Reviewers</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-purple-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Active Journals</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/dashboard/admin/journals"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
                        >
                            <BookOpen size={20} />
                            Manage Journals
                        </Link>
                        <Link
                            href="/dashboard/admin/submissions"
                            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium"
                        >
                            <FileText size={20} />
                            View Submissions
                        </Link>
                        <Link
                            href="/dashboard/admin/users"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
                        >
                            <Users size={20} />
                            Manage Users
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}