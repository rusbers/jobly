import { Button } from "@/components/ui/button"
import { type JobListing, JobListingCard } from "@/features/listings"
import { ViewMoreModal } from "./ViewMoreModal"
import { Heart, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { cn } from "@/utils/shadcnUtils"

type PublishedJobListingCardProps = {
  jobListing: JobListing
  isFavorite: boolean
  isHidden: boolean
  onToggleFavorite: (listingId: string) => void
  onToggleHide: (listingId: string, title: string) => void
}

export function PublishedJobListingCard({
  jobListing,
  isFavorite,
  isHidden,
  onToggleFavorite,
  onToggleHide,
}: PublishedJobListingCardProps) {
  const [openViewMoreModal, setOpenViewMoreModal] = useState(false)

  return (
    <JobListingCard
      className={isHidden ? "opacity-50" : undefined}
      jobListing={jobListing}
      topDetails={
        <>
          <Button
            onClick={() => onToggleFavorite(jobListing.id)}
            className='rounded-full'
            size={"icon"}
            variant={"ghost"}
          >
            <Heart className={cn("size-5", { "fill-red-600 stroke-red-600": isFavorite })} />
            <span className='sr-only'>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
          <Button
            onClick={() => onToggleHide(jobListing.id, jobListing.title)}
            className='rounded-full'
            size={"icon"}
            variant={"ghost"}
          >
            {isHidden ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
            <span className='sr-only'>{isHidden ? "Show" : "Hide"}</span>
          </Button>
        </>
      }
      mainActions={
        <>
          <Button onClick={() => setOpenViewMoreModal(true)}>View More</Button>
          <ViewMoreModal
            open={openViewMoreModal}
            onOpenChange={setOpenViewMoreModal}
            currentValues={jobListing}
          />
        </>
      }
    />
  )
}
