import { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckoutForm } from "@/features/listings/components/CheckoutForm"
import { stripePromise } from "@/lib/stripe"
import { useTheme } from "@/hooks/useTheme"
import { JOB_LISTING_DURATIONS } from "@backend/constants/types"
import { getJobListingPriceInCents } from "@backend/utils/getJobListingPriceInCents"
import { formatCurrency, getJobListingStatus, getPurchaseButtonText } from "../utils/listingUtils"
import { createPublishPaymentIntent } from "../services/listings"

type JobListingPaymentDialogProps = {
  id: string
  title: string
  status: ReturnType<typeof getJobListingStatus>
}

export function JobListingPaymentDialog({ id, title, status }: JobListingPaymentDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState<(typeof JOB_LISTING_DURATIONS)[number]>()
  const [clientSecret, setClientSecret] = useState<string>()
  const { theme } = useTheme()

  return (
    <Dialog
      open={selectedDuration != null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedDuration(undefined)
          setClientSecret(undefined)
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${getPurchaseButtonText(
            status
          )} ${title} for ${selectedDuration} days`}</DialogTitle>
          <DialogDescription>This is a non-refundable purchase</DialogDescription>
        </DialogHeader>

        {clientSecret && selectedDuration && (
          <Elements
            options={{
              clientSecret,
              appearance: { theme: theme === "dark" ? "night" : "stripe" },
            }}
            stripe={stripePromise}
          >
            <CheckoutForm amount={getJobListingPriceInCents(selectedDuration) / 100} />
          </Elements>
        )}
      </DialogContent>

      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ variant: "default" })}>
          {getPurchaseButtonText(status)}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {JOB_LISTING_DURATIONS.map((duration) => (
            <DropdownMenuItem
              key={duration}
              onClick={async () => {
                setSelectedDuration(duration)
                const { clientSecret } = await createPublishPaymentIntent(id, duration)
                setClientSecret(clientSecret)
              }}
            >
              {`${duration} Days - ${formatCurrency(getJobListingPriceInCents(duration) / 100)}`}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
