import { jobListingFormSchema } from "@backend/constants/schemas/jobListings"
import { z } from "zod"
import { jobListingSchema } from "./constants"

export type JobListingFormValues = z.infer<typeof jobListingFormSchema>
export type JobListing = z.infer<typeof jobListingSchema>
