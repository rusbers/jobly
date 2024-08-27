import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, useLocation } from "react-router-dom"
import { getDaysRemainingText, getJobListingBadgeVariant, getJobListingStatus } from "../utils/listingUtils"
import { JobListing } from "../constants/types"
import { JobListingCard } from "./JobListingCard"
import { DeleteListingDialog } from "./DeleteListingDialog"
import { JobListingPaymentDialog } from "./JobListingPaymentDialog"

export function MyJobListingCard({
  jobListing,
  onDelete,
}: {
  jobListing: JobListing
  onDelete: () => Promise<void>
}) {
  const status = getJobListingStatus(jobListing.expiresAt)

  return (
    <JobListingCard
      jobListing={jobListing}
      topDetails={
        <Badge variant={getJobListingBadgeVariant(status)} className='rounded'>
          {status}
          {status === "Active" && jobListing.expiresAt && ` - ${getDaysRemainingText(jobListing.expiresAt)}`}
        </Badge>
      }
      mainActions={
        <>
          <DeleteListingDialog onDelete={onDelete} />
          <EditJobListingBtn id={jobListing.id} />
          <JobListingPaymentDialog id={jobListing.id} title={jobListing.title} status={status} />
        </>
      }
    />
  )
}

function EditJobListingBtn({ id }: { id: string }) {
  const location = useLocation()

  return (
    <Link to={`${location.pathname}/edit/${id}`} className={buttonVariants({ variant: "outline" })}>
      Edit
    </Link>
  )
}
