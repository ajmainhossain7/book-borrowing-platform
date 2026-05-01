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

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-gray-500" />
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div
        className="w-full max-w-md bg-white border border-gray-200 
                   rounded-2xl shadow-sm hover:shadow-md transition 
                   p-6 sm:p-8 flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src={
              user.image ||
              `https://ui-avatars.com/api/?name=${user.name}&background=E5E7EB&color=374151`
            }
            alt={user.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover 
                       border-2 border-gray-200 shadow-sm"
          />
        </div>

        {/* Name */}
        <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-500 text-sm break-all">
          {user.email}
        </p>

        {/* Divider */}
        <div className="w-full border-t my-5" />

        {/* Action */}
        <div className="w-full flex justify-center">
          <UpdateUserModal />
        </div>
      </div>
    </div>
  );
}