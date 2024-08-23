import { AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/shadcnUtils"
import { signupFormSchema } from "../constants/schemas"
import { SignupFormValues } from "../constants/types"
import { useAuthContext } from "../hooks/useAuthContext"
import { useErrorToast } from "../hooks/useErrorToast"
import { useIsAuthError } from "../hooks/useIsAuthError"

export function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const navigate = useNavigate()
  const errorToast = useErrorToast()
  const location = useLocation()
  const [isAuthError, setIsAuthError] = useIsAuthError()
  const { signup } = useAuthContext()

  const onSubmit = async ({ email, password }: Omit<SignupFormValues, "confirmPassword">) => {
    try {
      await signup(email, password)
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        if (error.response.status === 400) {
          errorToast({ title: error.response.data.message })
          setIsAuthError(true)
        } else {
          errorToast({
            title: "Oops! Something went wrong on our side :(",
          })
          setIsAuthError(true)
        }
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
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} placeholder='example@email.com' />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='at least 8 characters' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
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
            <Button className='w-full md:w-auto order-2 md:order-none' type='button' variant={"outline"}>
              <Link to='/auth/login'>Login</Link>
            </Button>
            <Button
              className='w-full md:w-auto order-first md:order-none'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type='submit'
            >
              {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
