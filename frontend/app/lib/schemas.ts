import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters long"),
    email: z.email('Invalid email address'),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const signInSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const forgotPasswordSchema = z.object({
    email: z.email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
    // token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
})