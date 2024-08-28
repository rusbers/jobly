import { defer, type Params } from "react-router-dom"
import EditListingPage from "./EditListingPage"
import { getJobListing } from "@/features/listings"

export const editMyListingRoute = {
  loader: ({ params }: { params: Params<"id"> }) =>
    defer({ jobListingPromise: getJobListing(params.id!) }),
  element: <EditListingPage />,
}
