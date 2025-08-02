"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormValues {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  gender: string;
  country: string;
  age: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      // Replace with your signup logic (e.g. API call)
      console.log("Signup data:", data);

      toast.success("Signup successfully");
      await router.push("/home");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://i.ibb.co/m8KT5fz/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxHeight: "100vh",
      }}
    >
      <div className="max-w-md w-full space-y-8 border border-spacing-1 p-4 rounded-md backdrop-blur-md bg-opacity-75 bg-black">
        <h1 className="text-3xl font-bold text-center text-white">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              {...register("username", { required: "Name is required" })}
              placeholder="Enter your name"
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Retype Password */}
          <div>
            <input
              type="password"
              {...register("retypePassword", {
                required: "Please retype your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Retype your password"
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            />
            {errors.retypePassword && (
              <p className="text-red-500 text-sm">
                {errors.retypePassword.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              {...register("gender", { required: "Please select gender" })}
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <select
              {...register("country", { required: "Please select country" })}
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            >
              <option value="">Select Country</option>
              <option value="bangladesh">Bangladesh</option>
              <option value="india">India</option>
              <option value="turkey">Turkey</option>
              <option value="pakistan">Pakistan</option>
              <option value="korea">Korea</option>
              <option value="united-states">United States</option>
              <option value="china">China</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Birthdate
            </label>
            <input
              type="date"
              {...register("age", { required: "Birthdate is required" })}
              className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full sm:text-sm"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-gray-300 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-300">Already have an account? </span>
          <Link href="/login">
            <span className="text-red-600 font-medium hover:text-red-400">
              Sign in
            </span>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
