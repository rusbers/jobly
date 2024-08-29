import { z } from "zod"
import { jobListingFormSchema, jobListingSchema } from "./constants"

export const JOB_LISTING_TYPES = ["Full Time", "Part Time", "Internship"] as const

export const JOB_LISTING_EXPERIENCE_LEVELS = ["Junior", "Mid-Level", "Senior"] as const

export const JOB_LISTING_DURATIONS = [30, 60, 90] as const

export type JobListingFormValues = z.infer<typeof jobListingFormSchema>
export type JobListing = z.infer<typeof jobListingSchema>
