import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { JOB_LISTING_EXPERIENCE_LEVELS, JOB_LISTING_TYPES } from "@backend/constants/types"
import { UseFormReturn } from "react-hook-form"
import { JobListingFormSelector } from "./JobListingForm"
import { JobListingFilterFormValues } from "../hooks/useJobListingFilterForm"

type JobListingFilterFormProps = {
  className?: string
  form: UseFormReturn<JobListingFilterFormValues>
}

export function JobListingFilterForm({ className, form }: JobListingFilterFormProps) {
  return (
    <Form {...form}>
      <form className={className} onSubmit={(e) => e.preventDefault()}>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='minimumSalary'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={0}
                    {...field}
                    value={isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
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
          <div className='flex items-end justify-between gap-4'>
            <div className='flex flex-col justify-end gap-4'>
              <FormField
                control={form.control}
                name='showHidden'
                render={({ field }) => (
                  <FormItem className='flex gap-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === "indeterminate" ? false : checked)
                        }}
                      />
                    </FormControl>
                    <FormLabel>Show Hidden</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='onlyShowFavorites'
                render={({ field }) => (
                  <FormItem className='flex gap-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === "indeterminate" ? false : checked)
                        }}
                      />
                    </FormControl>
                    <FormLabel>Only Show Favorites</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='button' onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
