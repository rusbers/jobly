import { JobListingFormValues } from "../constants/types"

export function generatePreviewJobListingPlaceholders(currentListingValues: JobListingFormValues) {
  return {
    ...currentListingValues,
    title: currentListingValues.title || "Add title",
    companyName: currentListingValues.companyName || "Add company name",
    location: currentListingValues.location || "Add location",
    shortDescription: currentListingValues.shortDescription || "Add description",
  }
}
