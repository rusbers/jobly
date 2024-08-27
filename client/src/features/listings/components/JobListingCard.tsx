import { cn } from "@/utils/shadcnUtils"
import { type HTMLAttributes } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeGroup } from "./BadgeGroup"
import { JobListing } from "../constants/types"

type JobListingCardProps = HTMLAttributes<HTMLDivElement> & {
  jobListing: Omit<JobListing, "id" | "expiresAt">
  topDetails?: React.ReactNode
  mainActions?: React.ReactNode
}

export function JobListingCard({ className, jobListing, topDetails, mainActions }: JobListingCardProps) {
  return (
    <Card className={cn("w-full md:max-w-md", className)}>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{jobListing.title}</CardTitle>
          {topDetails}
        </div>
        <CardDescription>{jobListing.companyName}</CardDescription>
        <CardDescription>{jobListing.location}</CardDescription>
        <BadgeGroup
          salary={jobListing.salary}
          type={jobListing.type}
          experienceLevel={jobListing.experienceLevel}
        />
      </CardHeader>
      <CardContent>
        <p>{jobListing.shortDescription}</p>
      </CardContent>
      <CardFooter className='justify-end gap-2'>{mainActions}</CardFooter>
    </Card>
  )
}
