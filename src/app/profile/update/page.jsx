"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [user, isPending]);

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: e.target.name.value,
      image: e.target.image.value,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Update failed");
    } else {
      toast.success("Profile updated!");
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Update Information</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              required
              defaultValue={user.name}
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Photo URL</label>
            <input
              name="image"
              type="url"
              defaultValue={user.image || ""}
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white rounded-lg py-2 transition text-sm font-medium"
          >
            {loading ? "Saving..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}