import { Button } from '@/components/ui/button'
import { JobListing } from '../constants/types'
import { JobListingCard } from './JobListingCard'
import { JobListingGrid } from './JobListingGrid'
import { Link } from 'react-router-dom'
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
} from '@/components/ui/alert-dialog'
import { deleteListing } from '../services/jobListing'
import { useMemo, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

type MyJobListingsGridProps = {
  jobListings: JobListing[]
}

export function MyJobListingsGrid({ jobListings }: MyJobListingsGridProps) {
  const [deletedJobListingsIds, setDeletedJobListingsIds] = useState<string[]>([])

  const visibleJobListings = useMemo(() => {
    return jobListings.filter((jobListing) => !deletedJobListingsIds.includes(jobListing.id))
  }, [jobListings, deletedJobListingsIds])

  function deleteJobListing(id: string) {
    deleteListing(id).catch(() => {
      toast({
        title: 'Failed to delete job listing',
        action: (
          <ToastAction
            altText='Click the delete button in the job card to retry'
            onClick={() => deleteJobListing(id)}
          >
            Retry
          </ToastAction>
        ),
      })
      return setDeletedJobListingsIds((ids) => ids.filter((jobListingId) => jobListingId !== id))
    })
    setDeletedJobListingsIds((ids) => [...ids, id])
  }

  return (
    <JobListingGrid>
      {visibleJobListings.map((jobListing) => (
        <MyJobListingCard
          key={jobListing.id}
          deleteJobListing={deleteJobListing}
          jobListing={jobListing}
        />
      ))}
    </JobListingGrid>
  )
}

type MyJobListingCard = {
  jobListing: JobListing
  deleteJobListing: (id: string) => void
}

function MyJobListingCard({ jobListing, deleteJobListing }: MyJobListingCard) {
  return (
    <JobListingCard
      {...jobListing}
      footerBtns={
        <>
          <DeleteJobListingDialog deleteListing={() => deleteJobListing(jobListing.id)} />
          <Button variant='outline' asChild>
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
          </Button>
        </>
      }
    />
  )
}

type DeleteJobListingDialogProps = {
  deleteListing: () => void
}

function DeleteJobListingDialog({ deleteListing }: DeleteJobListingDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this job listing?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job listing and any
            remaining time will not be refunded.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteListing}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
