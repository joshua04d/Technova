"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { BookOpen, Shield, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Publish Your Research with
            <span className="text-blue-600"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            TechNova Research Hub provides a streamlined platform for
            submitting, reviewing, and publishing academic papers.
          </p>
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
                Start Submitting Today →
              </button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl border border-gray-200">
              <BookOpen className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Easy Submission
              </h3>
              <p className="text-gray-500 text-sm">
                Submit your paper in minutes with our guided multi-step form
              </p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-200">
              <Users className="mx-auto text-green-600 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Expert Review
              </h3>
              <p className="text-gray-500 text-sm">
                Your paper reviewed by qualified domain experts
              </p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-200">
              <Shield className="mx-auto text-purple-600 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-500 text-sm">
                Bank-grade security for your research and payments
              </p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-200">
              <Award className="mx-auto text-yellow-600 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Certificates
              </h3>
              <p className="text-gray-500 text-sm">
                Get verified certificates for accepted publications
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}