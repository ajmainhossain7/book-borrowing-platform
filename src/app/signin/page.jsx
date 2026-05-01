"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: e.target.email.value,
      password: e.target.password.value,
    });

    setLoading(false);

    if (error) {
      // যদি user exist না করে → register করতে বলো
      if (
        error.message?.toLowerCase().includes("user not found") ||
        error.message?.toLowerCase().includes("invalid credentials") ||
        error.status === 401
      ) {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Account not found!</p>
              <p className="text-sm text-gray-600">Please register first.</p>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  router.push("/signup");
                }}
                className="bg-amber-500 text-white text-sm px-3 py-1 rounded-lg"
              >
                Go to Register →
              </button>
            </div>
          ),
          { duration: 5000 }
        );
      } else if (error.message?.toLowerCase().includes("password")) {
        // password ভুল হলে
        toast.error("Wrong password. Please try again.");
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    } else {
      toast.success("Welcome back!");
      setTimeout(() => router.push("/"), 1000);
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
          No account?{" "}
          <Link href="/signup" className="text-amber-600 underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}