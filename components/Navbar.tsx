"use client";

import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
    const { isSignedIn, user } = useUser();

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={28} />
                    <span className="text-xl font-bold text-gray-900">
                        TechNova Research Hub
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    {isSignedIn ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-blue-600 font-medium"
                            >
                                Dashboard
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <button className="text-gray-600 hover:text-blue-600 font-medium">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}