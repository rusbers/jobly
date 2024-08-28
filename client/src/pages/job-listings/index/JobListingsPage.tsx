import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import {
  type JobListing,
  JobListingFilterForm,
  JobListingsGrid,
  PublishedJobListingCard,
  useJobListingFilterForm,
} from "@/features/listings"
import { Link, useLoaderData, Await } from "react-router-dom"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Suspense } from "react"
import { JobListingCardSkeleton } from "@/features/listings"

export default function JobListingsPage() {
  const { publishedListingsPromise } = useLoaderData() as {
    publishedListingsPromise: Promise<JobListing[]>
  }
  const [hiddenJobListingIds, setHiddenJobListingIds] = useLocalStorage<string[]>(
    "hiddenJobListingsIds",
    []
  )
  const [favoriteJobListingIds, setFavoriteJobListingIds] = useLocalStorage<string[]>(
    "favoriteJobListingsIds",
    []
  )
  const { form, getFilteredJobs } = useJobListingFilterForm()
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
        Job Listings
      </PageHeader>

      <JobListingFilterForm className='mb-12' form={form} />

      <JobListingsGrid>
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <JobListingCardSkeleton key={i} />
          ))}
        >
          <Await resolve={publishedListingsPromise}>
            {(publishedListings: JobListing[]) => {
              const filteredJobListings = getFilteredJobs(
                publishedListings,
                hiddenJobListingIds,
                favoriteJobListingIds
              )

              return filteredJobListings.map((jobListing) => (
                <PublishedJobListingCard
                  key={jobListing.id}
                  jobListing={jobListing}
                  isFavorite={favoriteJobListingIds.includes(jobListing.id)}
                  isHidden={hiddenJobListingIds.includes(jobListing.id)}
                  onToggleFavorite={toggleFavorite}
                  onToggleHide={toggleHide}
                />
              ))
            }}
          </Await>
        </Suspense>
      </JobListingsGrid>
    </>
  )
}
