"use client";

import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="bg-black text-white px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-gray-800 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </SignUpButton>
        </>
      ) : (
        <>
          <p>You are signed in ✅</p>
          <UserButton />
        </>
      )}
    </main>
  );
}