import { getAllMyListings } from '@/features/job-listings'
import { defferedLoader } from '@/lib/reactRouter'

export const loader = defferedLoader(() => {
  return { jobListingsPromise: getAllMyListings() }
})
