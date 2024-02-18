import { getJobListing } from '@/features/job-listings'
import { defferedLoader } from '@/lib/reactRouter'

export const loader = defferedLoader(({ params: { id } }) => {
  if (typeof id !== 'string') throw new Response('Not Found', { status: 404 })

  return { jobListingPromise: getJobListing(id), id }
})
