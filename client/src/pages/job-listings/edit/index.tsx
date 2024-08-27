import type { Params } from "react-router-dom"
import EditListingPage from "./EditListingPage"
import { getJobListing } from "@/features/listings"

export const editMyListingRoute = {
  loader: ({ params }: { params: Params<"id"> }) => getJobListing(params.id!),
  element: <EditListingPage />,
}
