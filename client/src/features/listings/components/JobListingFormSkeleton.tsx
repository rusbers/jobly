import { Skeleton } from "@/components/ui/skeleton"

export function JobListingFormSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-4 md:grid md:grid-cols-3 md:space-y-0 md:gap-4'>
        {/* Title */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Input */}
        </div>
        {/* Company Name */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Input */}
        </div>
        {/* Location */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Input */}
        </div>
        {/* Application URL */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Input */}
        </div>
        {/* Type */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Select */}
        </div>
        {/* Experience Level */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Select */}
        </div>
        {/* Salary */}
        <div>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-10 w-full' /> {/* Input */}
        </div>
        {/* Short Description */}
        <div className='md:col-span-2'>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-20 w-full' /> {/* Textarea */}
        </div>
        {/* Full Description */}
        <div className='md:col-span-full'>
          <Skeleton className='h-4 w-1/3 mb-2' /> {/* Label */}
          <Skeleton className='h-40 w-full' /> {/* Textarea */}
        </div>
        {/* Buttons */}
        <div className='flex gap-4 md:col-span-full md:justify-end'>
          <Skeleton className='h-10 w-full md:w-32' /> {/* Show Preview Button */}
          <Skeleton className='h-10 w-full md:w-32' /> {/* Save Button */}
        </div>
      </div>
    </div>
  )
}
