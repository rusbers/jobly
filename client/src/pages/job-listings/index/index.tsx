import { getAllPublishedListings } from "@/features/listings"
import JobListingsPage from "./JobListingsPage"

export const publishedJobListingsRoute = {
  loader: () => getAllPublishedListings(),
  element: <JobListingsPage />,
}
