import { PageHeader } from "@/components/ui/PageHeader"
import { JobListingForm, JobListingFormValues, createJobListing } from "@/features/listings"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

export function NewListingPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: JobListingFormValues) => {
    try {
      await createJobListing(values)
      navigate("/job-listings/my-listings")
    } catch (error: unknown) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please retry or contact our support team!",
        variant: "destructive",
      })
    }
  }
  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm onSubmit={onSubmit} />
    </>
  )
}
