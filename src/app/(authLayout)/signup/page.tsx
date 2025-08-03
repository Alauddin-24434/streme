"use client"

import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useDispatch } from "react-redux"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { setCredentials } from "@/redux/features/auth/authSlice"

// Schema for validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    retypePassword: z.string(),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Registration failed")
      }
      toast.success("Registration successful")
      dispatch(setCredentials({ user: result.user, token: result.token }))
      router.push("/home")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
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
      <Card className="w-full max-w-md bg-black bg-opacity-70 text-white shadow-lg backdrop-blur-sm border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-gray-300">Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Your Name"
                className=" text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
                className=" text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className=" text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="retypePassword">Retype Password</Label>
              <Input
                id="retypePassword"
                type="password"
                {...register("retypePassword")}
                placeholder="••••••••"
                className="text-gray-300 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
              />
              {errors.retypePassword && <p className="text-sm text-red-400 mt-1">{errors.retypePassword.message}</p>}
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 transition-colors cursor-pointer text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col gap-2">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}
