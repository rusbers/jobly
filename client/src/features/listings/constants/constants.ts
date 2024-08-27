import { jobListingFormSchema } from "@backend/constants/schemas/jobListings"
import { z } from "zod"

export const jobListingSchema = jobListingFormSchema.merge(
  z.object({
    id: z.string(),
    expiresAt: z.nullable(z.coerce.date()),
  })
)
