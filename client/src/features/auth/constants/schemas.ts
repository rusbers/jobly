import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signupFormSchema = z
  .object({
    email: z.string().email("Must be a valid email"),
    password: z
      .string()
      .regex(
        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
        "At least one lowercase, one uppercase letter and one number"
      )
      .min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
