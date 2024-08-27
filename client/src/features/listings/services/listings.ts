import { baseApi } from "@/services/baseApi"
import { z } from "zod"
import { jobListingSchema } from "../constants/constants"
import { JobListing, JobListingFormValues } from "../constants/types"
import { JOB_LISTING_DURATIONS } from "@backend/constants/types"

export async function createJobListing(data: JobListingFormValues) {
  const res = await baseApi.post("/job-listings", data)
  return await jobListingSchema.parseAsync(res.data)
}

export async function getMyJobListings() {
  const res = await baseApi.get("/job-listings/my-listings")
  return await z.array(jobListingSchema).parseAsync(res.data)
}

export async function getJobListing(id: string) {
  const res = await baseApi.get(`/job-listings/${id}`)
  return await jobListingSchema.parseAsync(res.data)
}

export async function editJobListing(id: string, data: JobListingFormValues) {
  const res = await baseApi.put(`/job-listings/${id}`, data)
  return await jobListingSchema.parseAsync(res.data)
}

export async function deleteJobListing(id: string): Promise<JobListing> {
  const res = await baseApi.delete(`/job-listings/${id}`)
  return res.data
}

export async function createPublishPaymentIntent(
  id: string,
  duration: (typeof JOB_LISTING_DURATIONS)[number]
) {
  const res = await baseApi.post<{ clientSecret: string }>(
    `/job-listings/${id}/create-publish-payment-intent`,
    { duration }
  )
  return res.data
}
