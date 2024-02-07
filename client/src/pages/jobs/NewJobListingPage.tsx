import { PageHeader } from '@/components/ui/PageHeader'
import { JobListingForm } from '@/features/job-listings'

export function NewJobListingPage() {
  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm />
    </>
  )
}
