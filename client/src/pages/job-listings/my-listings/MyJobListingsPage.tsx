import { Button, buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { type JobListing, JobListingCard } from "@/features/listings"
import { Badge } from "@/components/ui/badge"
import { Link, useLoaderData, useLocation } from "react-router-dom"
import { deleteJobListing } from "@/features/listings"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMemo, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function MyJobListingsPage() {
  const location = useLocation()
  const myJobListings = useLoaderData() as JobListing[]
  const [deletedListingsIds, setDeletedListingsIds] = useState<string[]>([])
  const { toast } = useToast()

  const visibleJobListings = useMemo(() => {
    return myJobListings.filter((jobListing) => !deletedListingsIds.includes(jobListing.id))
  }, [myJobListings, deletedListingsIds])

  const deleteListing = async (id: string) => {
    try {
      await deleteJobListing(id)
      setDeletedListingsIds((prev) => [...prev, id])
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please retry or contact our support team!",
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
          <JobListingCard
            key={jobListing.id}
            jobListing={jobListing}
            topDetails={<Badge variant={"secondary"}>Daft</Badge>}
            mainActions={
              <>
                <DeletListingBtn deleteListing={() => deleteListing(jobListing.id)} />
                <Link
                  to={`${location.pathname}/edit/${jobListing.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Edit
                </Link>
                <Button variant={"default"}>Publish</Button>
              </>
            }
          />
        ))}
      </div>
    </>
  )
}

export function DeletListingBtn({ deleteListing }: { deleteListing: () => Promise<void> }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this job listing?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job listing and any remaining time
            will not be refunded
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteListing()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
