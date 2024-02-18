import { PageHeader } from '@/components/ui/PageHeader'
import { JobListingForm, editJobListing } from '@/features/job-listings'
import { Await, useDefferedLoaderData } from '@/lib/reactRouter'
import { useNavigate } from 'react-router-dom'
import { loader } from './loader'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function EditJobListingPage() {
  const navigate = useNavigate()
  const { id, jobListingPromise } = useDefferedLoaderData<typeof loader>()
  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className='w-24 h-24' />}>
        <Await resolve={jobListingPromise}>
          {(jobListing) => (
            <JobListingForm
              initialJobListing={jobListing}
              onSubmit={async (values) => {
                await editJobListing(id, values)
                navigate('/jobs/my-listings')
              }}
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}
