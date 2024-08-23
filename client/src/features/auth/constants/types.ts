import { z } from "zod"
import { loginFormSchema, signupFormSchema } from "./schemas"

export type User = {
  id: string
  email: string
}

export type LoginFormValues = z.infer<typeof loginFormSchema>

export type SignupFormValues = z.infer<typeof signupFormSchema>
