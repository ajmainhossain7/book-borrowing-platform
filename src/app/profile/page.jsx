"use client";

import { UpdateUserModal } from "@/components/UpdateUserModal";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) router.push("/signin");
  }, [user, isPending]);

  if (isPending) return (
    <div className="flex justify-center mt-20">
      <span className="loading loading-spinner" />
    </div>
  );
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border rounded-xl p-8 bg-white shadow-sm flex flex-col items-center gap-3">
        <img
          src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <UpdateUserModal />
      </div>
    </div>
  );
}