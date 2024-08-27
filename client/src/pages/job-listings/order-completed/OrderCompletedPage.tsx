import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Link, useLoaderData } from "react-router-dom"

export function OrderCompletedPage() {
  const message = useLoaderData() as string

  return (
    <div className='flex flex-col items-center'>
      <PageHeader subtitle={<p>{message}</p>}>Order Complete</PageHeader>
      <Button asChild>
        <Link to='/job-listings/my-listings'>View Your Job Listings</Link>
      </Button>
    </div>
  )
}
