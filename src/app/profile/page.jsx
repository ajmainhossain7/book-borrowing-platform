"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col items-center text-center">
        <img
          src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=E5E7EB&color=374151`}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <div className="w-full border-t my-5" />

        {/* ✅ Navigates to /profile/update instead of opening a modal */}
        <button
          onClick={() => router.push("/profile/update")}
          className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition font-medium text-sm"
        >
          <FiEdit /> Update Profile
        </button>
      </div>
    </div>
  );
}