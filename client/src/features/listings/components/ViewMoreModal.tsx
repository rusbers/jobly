import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { cn } from "@/utils/shadcnUtils"
import { generatePreviewJobListingPlaceholders } from "../utils/listingUtils"
import { BadgeGroup } from "./BadgeGroup"
import { JobListingFormValues } from "../constants/types"

type ViewMoreModalProps = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  currentValues: JobListingFormValues
}

export function ViewMoreModal({ open, onOpenChange, currentValues }: ViewMoreModalProps) {
  const listingData = generatePreviewJobListingPlaceholders(currentValues)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[95%] overflow-hidden flex flex-col max-w-[95%] lg:max-w-[70%]'>
        <DialogHeader>
          <DialogTitle>{listingData.title}</DialogTitle>
          <DialogDescription>{listingData.companyName}</DialogDescription>
          <DialogDescription>{listingData.location}</DialogDescription>

          <BadgeGroup
            salary={listingData.salary}
            type={listingData.type}
            experienceLevel={listingData.experienceLevel}
          />
        </DialogHeader>

        <a
          className={cn("max-w-64 gap-4 inline-flex items-center", buttonVariants())}
          href={listingData.applyUrl}
          target='_blank'
        >
          Apply On Company Site
          <ExternalLinkIcon className='size-5' />
        </a>

        <div className='flex-1 overflow-y-auto'>
          <MarkdownRenderer>{listingData.description}</MarkdownRenderer>
        </div>
      </DialogContent>
    </Dialog>
  )
}
