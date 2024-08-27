import { Button } from "@/components/ui/button"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FormEvent, useState } from "react"
import { formatCurrency } from "../utils/listingUtils"

type JobListingCheckoutFormProps = {
  amount: number
}

export function CheckoutForm({ amount }: JobListingCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/job-listings/order-completed`,
        },
      })

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message || "An error occurred with your payment.")
        } else {
          setErrorMessage("An unexpected error occurred.")
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err)
      setErrorMessage("An unexpected error occurred while processing your payment.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className='text-red-600 text-sm mb-4'>{errorMessage}</p>}
      <PaymentElement />
      <Button type='submit' disabled={isLoading || !stripe || !elements} className='mt-4 w-full'>
        {isLoading ? "Processing..." : `Pay ${formatCurrency(amount)}`}
      </Button>
    </form>
  )
}
