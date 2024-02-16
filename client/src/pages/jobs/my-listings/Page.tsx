import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/button'
import { Await, useDefferedLoaderData } from '@/lib/reactRouter'
import { Link } from 'react-router-dom'
import { loader } from './loader'
import { Suspense } from 'react'
import { JobListingSkeletonGrid, MyJobListingsGrid } from '@/features/job-listings'

export function MyJobListingsPage() {
  const { jobListingsPromise } = useDefferedLoaderData<typeof loader>()
  return (
    <>
      <PageHeader
        btnSection={
          <Button variant='outline' asChild>
            <Link to='/jobs/new'>Create Listing</Link>
          </Button>
        }
      >
        My Job Listings
      </PageHeader>
      <Suspense fallback={<JobListingSkeletonGrid />}>
        <Await resolve={jobListingsPromise}>
          {(jobListings) => <MyJobListingsGrid jobListings={jobListings} />}
        </Await>
      </Suspense>
    </>
  )
}
