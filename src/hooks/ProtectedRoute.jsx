"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
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

  return <>{children}</>;
}