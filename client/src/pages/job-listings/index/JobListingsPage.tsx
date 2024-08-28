import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import {
  type JobListing,
  JobListingFilterForm,
  JobListingsGrid,
  PublishedJobListingCard,
  useJobListingFilterForm,
} from "@/features/listings"
import { Link, useLoaderData } from "react-router-dom"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function JobListingsPage() {
  const publishedJobListings = useLoaderData() as JobListing[]
  const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<string[]>(
    "hiddenJobListingsIds",
    []
  )
  const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<string[]>(
    "favoriteJobListingsIds",
    []
  )
  const { form, getFilteredJobs } = useJobListingFilterForm()
  const filteredJobs = getFilteredJobs(
    publishedJobListings,
    hiddenJobListingIds,
    favoriteJobListingIds
  )
  const { toast } = useToast()

  const toggleFavorite = (listingId: string) => {
    setFavoriteJobListingIds((ids) =>
      ids.includes(listingId) ? ids.filter((id) => id !== listingId) : [...ids, listingId]
    )
  }

  const toggleHide = (listingId: string, title: string) => {
    setHiddenJobListingIds((ids) =>
      ids.includes(listingId) ? ids.filter((id) => id !== listingId) : [...ids, listingId]
    )

    if (hiddenJobListingIds.includes(listingId)) return

    toast({
      title: "Job Hidden",
      description: `${title} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => {
            setHiddenJobListingIds((ids) => ids.filter((id) => id !== listingId))
          }}
          altText="To unhide this job, click the 'Show hidden' checkbox in the filters, then click 'Show' on the listing"
        >
          Undo
        </ToastAction>
      ),
    })
  }

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant='outline' asChild>
            <Link to='/job-listings/my-listings/new'>Create Listing</Link>
          </Button>
        }
      >
        My Job Listings
      </PageHeader>

      <JobListingFilterForm className='mb-12' form={form} />

      <JobListingsGrid>
        {filteredJobs.map((jobListing) => (
          <PublishedJobListingCard
            key={jobListing.id}
            jobListing={jobListing}
            isFavorite={favoriteJobListingIds.includes(jobListing.id)}
            isHidden={hiddenJobListingIds.includes(jobListing.id)}
            onToggleFavorite={toggleFavorite}
            onToggleHide={toggleHide}
          />
        ))}
      </JobListingsGrid>
    </>
  )
}
