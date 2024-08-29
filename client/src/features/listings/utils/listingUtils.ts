import { differenceInDays, formatDistanceStrict, isAfter } from "date-fns"
import { JOB_LISTING_DURATIONS, JobListing, JobListingFormValues } from "../constants/types"

export function generatePreviewJobListingPlaceholders(currentListingValues: JobListingFormValues) {
  return {
    ...currentListingValues,
    title: currentListingValues.title || "Add title",
    companyName: currentListingValues.companyName || "Add company name",
    location: currentListingValues.location || "Add location",
    shortDescription: currentListingValues.shortDescription || "Add description",
  }
}

export function getJobListingStatus(expiresAt: Date | null) {
  if (expiresAt === null) return "Draft"
  return isAfter(expiresAt, new Date()) ? "Active" : "Expired"
}

export function getDaysRemainingText(expiresAt: Date) {
  return `${formatDistanceStrict(expiresAt, new Date(), { unit: "day" })} left`
}

export function getPurchaseButtonText(status: ReturnType<typeof getJobListingStatus>) {
  switch (status) {
    case "Draft":
      return "Publish"
    case "Active":
      return "Extend"
    case "Expired":
      return "Republish"
  }
}

export function getJobListingBadgeVariant(status: ReturnType<typeof getJobListingStatus>) {
  switch (status) {
    case "Draft":
      return "secondary"
    case "Active":
      return "default"
    case "Expired":
      return "destructive"
  }
}

export function sortJobListings(a: JobListing, b: JobListing) {
  if (a.expiresAt === b.expiresAt) return 0
  if (a.expiresAt === null) return -1
  if (b.expiresAt === null) return 1
  return differenceInDays(a.expiresAt, b.expiresAt)
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here")
}

export function getJobListingPriceInCents(duration: (typeof JOB_LISTING_DURATIONS)[number]) {
  switch (duration) {
    case 30:
      return 10000
    case 60:
      return 17500
    case 90:
      return 22500
    default:
      assertUnreachable(duration)
  }
}
