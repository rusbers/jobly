import MyJobListingsPage from "./MyJobListingsPage"
import { getMyJobListings } from "@/features/listings"

export const myJobListingsRoute = {
  loader: () => getMyJobListings(),
  element: <MyJobListingsPage />,
}
