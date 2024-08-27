import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { type JobListing, MyJobListingCard, sortJobListings } from "@/features/listings"
import { Link, useLoaderData } from "react-router-dom"
import { deleteJobListing } from "@/features/listings"
import { useMemo, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function MyJobListingsPage() {
  const myJobListings = useLoaderData() as JobListing[]
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])
  const { toast } = useToast()

  const visibleJobListings = useMemo(() => {
    return myJobListings
      .filter((jobListing) => !deletedListingsIds.includes(jobListing.id))
      .sort(sortJobListings)
  }, [myJobListings, deletedListingsIds])

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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {visibleJobListings.map((jobListing) => (
          <MyJobListingCard
            key={jobListing.id}
            jobListing={jobListing}
            onDelete={() => deleteListing(jobListing.id)}
          />
        ))}
      </div>
    </>
  )
}
