import MyJobListingsPage from "./MyJobListingsPage"
import { getMyJobListings } from "@/features/listings"
import { defer } from "react-router-dom"

export const myJobListingsRoute = {
  loader: () => defer({ myJobListingsPromise: getMyJobListings() }),
  element: <MyJobListingsPage />,
}
