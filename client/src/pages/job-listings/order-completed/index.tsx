import { stripePromise } from "@/lib/stripe"
import { OrderCompletedPage } from "./OrderCompletedPage"

export const orderCompletedRoute = {
  loader: async ({ request }: { request: { url: string } }) => {
    const urlParams = new URL(request.url).searchParams
    const clientSecretKey = urlParams.get("payment_intent_client_secret")

    const stripeInstance = await stripePromise

    if (!stripeInstance || !clientSecretKey) {
      return "An error occurred"
    }

    const { paymentIntent } = await stripeInstance.retrievePaymentIntent(clientSecretKey)

    if (!paymentIntent) {
      return "An error occurred"
    }

    switch (paymentIntent.status) {
      case "succeeded":
        return "Payment successful!"
      case "processing":
        return "Payment is currently processing."
      case "requires_payment_method":
        return "Payment failed, please try again."
      default:
        return "An unexpected error occurred."
    }
  },
  element: <OrderCompletedPage />,
}
