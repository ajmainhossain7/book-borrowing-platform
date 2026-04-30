"use client";
import { authClient } from "@/lib/auth-client";
import { UpdateUserModal } from "@/components/UpdateUserModal";
import { Avatar, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [user, isPending]);

  if (isPending) return <div className="flex justify-center mt-20"><span className="loading loading-spinner" /></div>;
  if (!user) return null;

  return (
    <div>
      <Card className="max-w-96 mx-auto flex flex-col items-center border mt-5 p-6 gap-3">
        <Avatar className="h-20 w-20">
          <Avatar.Image alt={user.name} src={user.image} referrerPolicy="no-referrer" />
          <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-muted">{user.email}</p>
        <UpdateUserModal />
      </Card>
    </div>
  );
};

export default ProfilePage;