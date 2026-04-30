"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Invalid email or password");
    } else {
      toast.success("Signed in successfully!");
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: 'google', callbackURL: "/" });
  };

  return (
    <Card className="border mx-auto w-125 py-10 mt-5 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Sign In</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password" minLength={8}>
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>

        <Button type="submit" className="w-full">Sign In</Button>
      </Form>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="text-amber-600 underline">Register</Link>
      </p>

      <div className="flex items-center gap-2 w-96 mx-auto">
        <hr className="flex-1" /><span className="text-sm text-gray-400">Or</span><hr className="flex-1" />
      </div>

      <Button onClick={handleGoogleSignIn} variant="outline" className="w-96 mx-auto">
        <GrGoogle /> Sign In With Google
      </Button>
    </Card>
  );
}