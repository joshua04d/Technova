import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FileText, Clock, CheckCircle } from "lucide-react";

export default async function ReviewerDashboard() {
    const user = await getCurrentUser();

    if (!user) redirect("/");
    if (user.role !== "REVIEWER") redirect("/dashboard");

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Reviewer Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Review assigned papers
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Clock className="text-yellow-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Pending Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Completed Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-500">Total Assigned</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Papers */}
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Assigned Papers
                        </h2>
                    </div>
                    <div className="p-12 text-center">
                        <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No papers assigned yet</p>
                        <p className="text-gray-400 text-sm mt-1">
                            Papers will appear here when assigned by admin
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}