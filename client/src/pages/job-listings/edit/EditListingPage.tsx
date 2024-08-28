import { PageHeader } from "@/components/ui/PageHeader"
import {
  type JobListing,
  JobListingForm,
  JobListingFormSkeleton,
  JobListingFormValues,
  editJobListing,
} from "@/features/listings"
import { Await, Params, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Suspense } from "react"

export default function EditListingPage() {
  const params = useParams() as Params<"id">
  const { jobListingPromise } = useLoaderData() as { jobListingPromise: Promise<JobListing> }
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
      <Suspense fallback={<JobListingFormSkeleton />}>
        <Await resolve={jobListingPromise}>
          {(jobListing: JobListing) => (
            <JobListingForm initialJobListings={jobListing} onSubmit={onSubmit} />
          )}
        </Await>
      </Suspense>
    </>
  )
}
