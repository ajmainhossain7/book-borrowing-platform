"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { GrGoogle } from "react-icons/gr";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: e.target.email.value,
      password: e.target.password.value,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Invalid email or password");
    } else {
      toast.success("Signed in!");
      router.push("/");
    }
  };

  const googleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-8 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" required
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="john@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" required
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="Your password" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition">
            {loading ? "Signing in..." : "Sign In"}
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
          No account? <Link href="/signup" className="text-amber-600 underline">Register</Link>
        </p>
      </div>
    </div>
  );
}