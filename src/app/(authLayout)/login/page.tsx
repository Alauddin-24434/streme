"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { setCredentials } from "@/redux/features/auth/authSlice"

type LoginFormInputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  // These environment variables are typically set in your Vercel project settings
  // For local development, you might use a .env.local file (but Next.js doesn't support it directly)
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com"
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "adminpassword"
  const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL || "user@example.com"
  const USER_PASSWORD = process.env.NEXT_PUBLIC_USER_PASSWORD || "userpassword"

  const onSubmit = async (data: LoginFormInputs) => {
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) {
        setError(result.message || "Login failed")
        return
      }
      console.log("Login successful:", result)
      dispatch(setCredentials({ user: result.user, token: result.token }))
      router.push("/home")
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Admin Login button handler
  const handleAdminLogin = () => {
    setValue("email", ADMIN_EMAIL)
    setValue("password", ADMIN_PASSWORD)
    handleSubmit(onSubmit)()
  }

  // User Login button handler
  const handleUserLogin = () => {
    setValue("email", USER_EMAIL)
    setValue("password", USER_PASSWORD)
    handleSubmit(onSubmit)()
  }

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
      <Card className="w-full max-w-md bg-black bg-opacity-70 text-white border shadow-lg backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-300">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
                className="text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className="text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-400 text-sm mt-1 text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 cursor-pointer transition-colors text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
          <div className="flex justify-between mt-6 space-x-4">
            <Button
              onClick={handleAdminLogin}
              className="flex-1 py-2 bg-transparent border hover:bg-green-700 cursor-pointer transition-colors text-white"
              disabled={loading}
            >
              Admin Login
            </Button>
            <Button
              onClick={handleUserLogin}
              className="flex-1 py-2 bg-transparent border hover:bg-green-700 cursor-pointer transition-colors text-white"
              disabled={loading}
            >
              User Login
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center flex flex-col gap-2">
          <p className="text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-gray-400 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
