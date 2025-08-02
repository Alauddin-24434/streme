"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Custom login logic here
      // e.g. await axios.post("/api/login", data);
      console.log("Login data:", data);
      toast.success("Logged in successfully");
      router.push("/home");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div
      className="login-container flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://i.ibb.co/m8KT5fz/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxHeight: "100vh",
      }}
    >
      <div className="max-w-sm w-full space-y-4 border border-spacing-1 p-4 rounded-md backdrop-blur-md bg-black bg-opacity-75">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email address"
                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className="mt-1 px-3 py-2 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-gray-300 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
