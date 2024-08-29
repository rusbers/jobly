import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { generatePreviewJobListingPlaceholders } from "../utils/listingUtils"
import { JobListingCard } from "./JobListingCard"
import { JOB_LISTING_EXPERIENCE_LEVELS, JOB_LISTING_TYPES, JobListingFormValues } from "../constants/types"
import { useState } from "react"
import { ViewMoreModal } from "./ViewMoreModal"
import { jobListingFormSchema } from "../constants/constants"

const DEFAULT_FORM_VALUES: JobListingFormValues = {
  title: "",
  companyName: "",
  location: "",
  applyUrl: "",
  salary: NaN,
  type: "Full Time",
  experienceLevel: "Mid-Level",
  shortDescription: "",
  description: "",
}

type JobListingFormProps = {
  onSubmit: (values: JobListingFormValues) => void
  initialJobListings?: JobListingFormValues
}

export function JobListingForm({
  onSubmit,
  initialJobListings = DEFAULT_FORM_VALUES,
}: JobListingFormProps) {
  const form = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingFormSchema),
    defaultValues: initialJobListings,
  })

  const [showPreview, setShowPreview] = useState(false)
  const [openViewMoreModal, setOpenViewMoreModal] = useState(false)

  return (
    <div className='space-y-10'>
      <Form {...form}>
        <form
          className='space-y-4 md:grid md:grid-cols-3 md:space-y-0 md:gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='applyUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application URL</FormLabel>
                <FormControl>
                  <Input placeholder='http://www.example.com' type='url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <JobListingFormSelector
                label='Type'
                values={JOB_LISTING_TYPES}
                defaultValue={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <FormField
            control={form.control}
            name='experienceLevel'
            render={({ field }) => (
              <JobListingFormSelector
                label='Experience Level'
                values={JOB_LISTING_EXPERIENCE_LEVELS}
                defaultValue={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <FormField
            control={form.control}
            name='salary'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    value={isNaN(field.value) ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='shortDescription'
            render={({ field }) => (
              <FormItem className='md:col-span-2'>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Max 200 characters' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='md:col-span-full'>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Supports full Markdown' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4 md:col-span-full md:justify-end'>
            <Button
              onClick={() => setShowPreview((prev) => !prev)}
              type='button'
              className='w-full md:w-auto'
              variant='outline'
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type='submit'
              className='w-full md:w-auto'
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
      {showPreview && (
        <PreviewJobListingCard
          currentValues={form.watch()}
          onOpenViewModal={() => setOpenViewMoreModal(true)}
        />
      )}
      <ViewMoreModal
        open={openViewMoreModal}
        onOpenChange={setOpenViewMoreModal}
        currentValues={form.watch()}
      />
    </div>
  )
}

type JobListingFormSelectorProps = {
  label: string
  values: readonly string[]
  defaultValue: string
  onValueChange: () => void
}

export function JobListingFormSelector({
  label,
  values,
  defaultValue,
  onValueChange,
}: JobListingFormSelectorProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {values.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}

type PreviewCardProps = {
  currentValues: JobListingFormValues
  onOpenViewModal: () => void
}

function PreviewJobListingCard({ currentValues, onOpenViewModal }: PreviewCardProps) {
  const jobListingData = generatePreviewJobListingPlaceholders(currentValues)

  return (
    <JobListingCard
      jobListing={jobListingData}
      mainActions={<Button onClick={onOpenViewModal}>View More</Button>}
    />
  )
}
