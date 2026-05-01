"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      image: e.target.image.value,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Try again.");
    } else {
      // ✅ auto session destroy করো
      await authClient.signOut();
      toast.success("Account created! Please sign in.");
      setTimeout(() => router.push("/signin"), 1500);
    }
  };

  const googleSignIn = async () => {
    toast.loading("Redirecting to Google...");
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">
      <Toaster position="top-center" />

      <div className="w-full max-w-md border rounded-xl p-8 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input name="name" type="text" required
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="Your full name" />
          </div>

          <div>
            <label className="text-sm font-medium">Photo URL</label>
            <input name="image" type="url"
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="https://example.com/photo.jpg" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" required
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="john@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" required minLength={8}
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="Min 8 characters" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1" /><span className="text-sm text-gray-400">or</span><hr className="flex-1" />
        </div>

        <button onClick={googleSignIn}
          className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition font-medium">
          <GrGoogle /> Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-amber-600 underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}