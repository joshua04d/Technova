import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboard() {
    const user = await getCurrentUser();

    if (!user) redirect("/");
    if (user.role !== "STUDENT") redirect("/dashboard");

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your research submissions
                    </p>
                </div>

                {/* Stats Cards */}
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
                                <p className="text-sm text-gray-500">Under Review</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Accepted</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <XCircle className="text-red-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Rejected</p>
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
                    <Link
                        href="/dashboard/student/submit"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
                    >
                        <FileText size={20} />
                        Submit New Paper
                    </Link>
                </div>

                {/* Submissions Table */}
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            My Submissions
                        </h2>
                    </div>
                    <div className="p-12 text-center">
                        <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No submissions yet</p>
                        <p className="text-gray-400 text-sm mt-1">
                            Start by submitting your first paper
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}