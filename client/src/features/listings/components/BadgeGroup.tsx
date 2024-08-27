import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils/shadcnUtils"
import { Banknote, CalendarDays, GraduationCap } from "lucide-react"
import { type HTMLAttributes } from "react"
import { JobListingFormValues } from "../constants/types"

type BadgeGroupProps = HTMLAttributes<HTMLDivElement> &
  Pick<JobListingFormValues, "salary" | "type" | "experienceLevel">

export function BadgeGroup({ salary, type, experienceLevel, className }: BadgeGroupProps) {
  return (
    <div className={cn("space-x-2", className)}>
      <Badge className='min-w-20 inline-flex items-center gap-1' variant={"secondary"}>
        <Banknote className='shrink-0 size-4' />
        {salary || 0}
      </Badge>
      <Badge className='min-w-20 inline-flex items-center gap-1' variant={"secondary"}>
        <CalendarDays className='shrink-0 size-4' />
        {type}
      </Badge>
      <Badge className='min-w-20 inline-flex items-center gap-1' variant={"secondary"}>
        <GraduationCap className='shrink-0 size-4' />
        {experienceLevel}
      </Badge>
    </div>
  )
}
