"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/src/redux/features/auth/authSlice";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const [error, setError] = useState("");
const dispatch = useDispatch();
const router = useRouter();


  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
  const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL || "";
  const USER_PASSWORD = process.env.NEXT_PUBLIC_USER_PASSWORD || "";

const onSubmit = async (data: LoginFormInputs) => {
  setError("");
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.message || "Login failed");
      return;
    }

    console.log("Login successful:", result);

    dispatch(setCredentials({ user: result.user, token: result.token }));

   
    router.push("/home");
  } catch {
    setError("Something went wrong");
  }
};

  // Admin Login button handler
  const handleAdminLogin = () => {
    setValue("email", ADMIN_EMAIL);
    setValue("password", ADMIN_PASSWORD);
    handleSubmit(onSubmit)();
  };

  // User Login button handler
  const handleUserLogin = () => {
    setValue("email", USER_EMAIL);
    setValue("password", USER_PASSWORD);
    handleSubmit(onSubmit)();
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
      <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg shadow-md backdrop-blur text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
          />

          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-red-600 rounded hover:bg-red-500 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={handleAdminLogin}
            className="flex-1 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
          >
            Admin Login
          </button>
          <button
            onClick={handleUserLogin}
            className="flex-1 py-2 bg-green-600 rounded hover:bg-green-500 transition-colors"
          >
            User Login
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-red-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
