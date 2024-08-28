import { getAllPublishedListings } from "@/features/listings"
import JobListingsPage from "./JobListingsPage"
import { defer } from "react-router-dom"

export const publishedJobListingsRoute = {
  loader: () => defer({ publishedListingsPromise: getAllPublishedListings() }),
  element: <JobListingsPage />,
}
