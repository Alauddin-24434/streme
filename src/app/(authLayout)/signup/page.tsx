"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/src/redux/features/auth/authSlice";

// Schema for validation
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  retypePassword: z.string(),
}).refine((data) => data.password === data.retypePassword, {
  message: "Passwords do not match",
  path: ["retypePassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Registration successful");
      dispatch(setCredentials({ user: result.user, token: result.token }));

      router.push("/home");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 py-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://i.ibb.co/m8KT5fz/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg shadow-md backdrop-blur">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
            {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register("retypePassword")}
              placeholder="Retype Password"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
            {errors.retypePassword && <p className="text-sm text-red-400 mt-1">{errors.retypePassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
