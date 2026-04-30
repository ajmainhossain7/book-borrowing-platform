"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name, email, password, image,
    });

    if (error) {
      toast.error(error.message || "Registration failed. Try again.");
    } else {
      toast.success("Account created! Please sign in.");
      router.push("/signin");
    }
  };

//   const handleGoogleSignIn = async () => {
//     await authClient.signIn.social({ provider: 'google', callbackURL: "/" });
//   };

  return (
    <Card className="border mx-auto w-125 py-10 mt-5 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Register</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Your full name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="url">
          <Label>Photo URL</Label>
          <Input placeholder="https://example.com/photo.jpg" />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password" minLength={8}>
          <Label>Password</Label>
          <Input placeholder="Min 8 chars, 1 uppercase, 1 number" />
          <FieldError />
        </TextField>

        <Button type="submit" className="w-full">Register</Button>
      </Form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="text-amber-600 underline">Sign In</Link>
      </p>

      <div className="flex items-center gap-2 w-96 mx-auto">
        <hr className="flex-1" /><span className="text-sm text-gray-400">Or</span><hr className="flex-1" />
      </div>

      {/* <Button onClick={handleGoogleSignIn} variant="outline" className="w-96 mx-auto">
        <GrGoogle /> Continue With Google
      </Button> */}
    </Card>
  );
}