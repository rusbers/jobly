import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/shadcnUtils"
import { loginFormSchema } from "../constants/schemas"
import { type LoginFormValues } from "../constants/types"
import { useAuthContext } from "../hooks/useAuthContext"
import { useErrorToast } from "../hooks/useErrorToast"
import { useIsAuthError } from "../hooks/useIsAuthError"

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const navigate = useNavigate()
  const location = useLocation()
  const errorToast = useErrorToast()
  const { login } = useAuthContext()
  const [isAuthError, setIsAuthError] = useIsAuthError()

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      await login(email, password)
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        errorToast({ title: error.response.data.message })
        setIsAuthError(true)
      } else {
        errorToast({
          title: "Unexpected error occurred",
          description: "Please try again later or contact us!",
        })
        setIsAuthError(true)
        console.error(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form className='w-full md:w-1/2' onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={cn("transition", isAuthError && "border-red-800 dark:border-red-600")}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex-col md:flex-row md:justify-end flex-wrap gap-4'>
            <Button
              className='w-full md:w-auto order-last md:order-none'
              type='button'
              variant={"ghost"}
              onClick={() => navigate(location.state?.location ?? "/")}
            >
              Cancel
            </Button>
            <Button
              className='w-full md:w-auto order-2 md:order-none'
              type='button'
              variant={"outline"}
              asChild
            >
              <Link to='/auth/signup'>Sign Up</Link>
            </Button>
            <Button
              className='w-full md:w-auto order-first md:order-none'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type='submit'
            >
              {form.formState.isSubmitting ? "Logging..." : "Log in"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
