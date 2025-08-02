import { z } from "zod";


export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  retypePassword: z.string(),
}).refine((data) => data.password === data.retypePassword, {
  message: "Passwords do not match",
  path: ["retypePassword"],
});


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
