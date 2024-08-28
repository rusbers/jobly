import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function JobListingCardSkeleton() {
  return (
    <Card className='w-full md:max-w-md'>
      <CardHeader>
        <div className='flex justify-between items-center gap-2'>
          <Skeleton className='w-2/3 h-6' />
          <div className='flex-shrink-0 flex items-center gap-2'>
            <Skeleton className='h-6 w-12' />
          </div>
        </div>

        <div className='mt-3 space-y-2'>
          <Skeleton className='w-1/3 h-3' />
          <Skeleton className='w-1/4 h-3' />
        </div>

        <div className='mt-4 flex space-x-2'>
          <Skeleton className='rounded-full w-16 h-5' />
          <Skeleton className='rounded-full w-16 h-5' />
          <Skeleton className='rounded-full w-16 h-5' />
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-2'>
          <Skeleton className='w-full h-3' />
          <Skeleton className='w-full h-3' />
          <Skeleton className='w-2/3 h-3' />
        </div>
      </CardContent>

      <CardFooter className='justify-end space-x-2 mt-4'>
        <Skeleton className='w-24 h-9' />
      </CardFooter>
    </Card>
  )
}
