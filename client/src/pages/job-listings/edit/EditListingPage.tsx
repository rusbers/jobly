import { PageHeader } from "@/components/ui/PageHeader"
import { type JobListing, JobListingForm, JobListingFormValues, editJobListing } from "@/features/listings"
import { Params, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

export default function EditListingPage() {
  const params = useParams() as Params<"id">
  const listingData = useLoaderData() as JobListing
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: JobListingFormValues) => {
    try {
      await editJobListing(params.id!, values)
      navigate("/job-listings/my-listings")
    } catch (error: unknown) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please retry or contact our support team.",
      })
    }
  }

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <JobListingForm initialJobListings={listingData} onSubmit={onSubmit} />
    </>
  )
}
