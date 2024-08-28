import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import {
  type JobListing,
  JobListingCardSkeleton,
  JobListingsGrid,
  MyJobListingCard,
  sortJobListings,
} from "@/features/listings"
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom"
import { deleteJobListing } from "@/features/listings"
import { Suspense, useMemo, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function MyJobListingsPage() {
  const { myJobListingsPromise } = useLoaderData() as {
    myJobListingsPromise: Promise<JobListing[]>
  }
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])
  const { toast } = useToast()

  const deleteListing = async (id: string) => {
    try {
      await deleteJobListing(id)
      setDeletedListingsIds((prev) => [...prev, id])
    } catch (error) {
      toast({
        title: "Failed to delete job listing",
        description: "Please retry or contact our support team!",
        action: (
          <Button variant='outline' onClick={() => deleteListing(id)}>
            Retry
          </Button>
        ),
      })
    }
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

      <JobListingsGrid>
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <JobListingCardSkeleton key={i} />
          ))}
        >
          <Await resolve={myJobListingsPromise}>
            <MyJobListings deletedListingsIds={deletedListingsIds} onDelete={deleteJobListing} />
          </Await>
        </Suspense>
      </JobListingsGrid>
    </>
  )
}

type MyJobListingsProps = {
  deletedListingsIds: string[]
  onDelete: (id: string) => void
}

function MyJobListings({ deletedListingsIds, onDelete }: MyJobListingsProps) {
  const jobListings = useAsyncValue() as JobListing[]

  const visibleJobListings = useMemo(() => {
    return jobListings
      .filter((jobListing) => !deletedListingsIds.includes(jobListing.id))
      .sort(sortJobListings)
  }, [jobListings, deletedListingsIds])

  return visibleJobListings.map((jobListing) => (
    <MyJobListingCard
      key={jobListing.id}
      jobListing={jobListing}
      onDelete={() => onDelete(jobListing.id)}
    />
  ))
}
